"use server";

import { searchSeries, getPosterUrl, getSeasonDetails, getSeriesDetails, TMDBSeries } from "@/lib/tmdb";

export interface IdentifiedDrama {
    input: string;
    found: boolean;
    tmdbId?: number;
    title?: string;
    posterUrl?: string | null;
    year?: string;
    isUncertain?: boolean;
    suggestion?: string;
    selectedSeason?: number | null;
}

export interface EnrichedDrama extends IdentifiedDrama {
    episodeCount?: number;
    runtime?: number; // average runtime in minutes
    totalRuntime?: number; // total minutes (eps * runtime)
    genres?: string[];
    keywords?: string[];
    cast?: { id: number; name: string; profilePath: string | null }[];
}

export async function identifyDramas(titles: string[]): Promise<IdentifiedDrama[]> {
    // Process in parallel
    const results = await Promise.all(
        titles.map(async (title) => {
            // Regex to detect "Season X", "S2", "Season 2", etc. (case insensitive)
            const seasonRegex = /(?:season|s)\s*(\d+)/i;
            const seasonMatch = title.match(seasonRegex);

            let query = title;
            let targetSeason: number | null = null;

            if (seasonMatch) {
                targetSeason = parseInt(seasonMatch[1], 10);
                // Remove the season part from the query to find the main show
                // "Squid Game Season 2" -> "Squid Game "
                query = title.replace(seasonRegex, "").trim();
            }

            const searchResults = await searchSeries(query);

            // Normalization helper: lowercase + remove all non-alphanumeric chars
            const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
            const normalizedQuery = normalize(query);

            // Sort results:
            // 1. Exact Title Match (Highest Priority)
            // 2. Recent Release Date (Secondary Priority)
            searchResults.sort((a, b) => {
                const nameA = normalize(a.name);
                const nameB = normalize(b.name);

                const exactA = nameA === normalizedQuery;
                const exactB = nameB === normalizedQuery;

                if (exactA && !exactB) return -1; // A comes first
                if (!exactA && exactB) return 1;  // B comes first

                // If both are exact or both are NOT exact, sort by newest date
                const dateA = a.first_air_date || "0000";
                const dateB = b.first_air_date || "0000";
                return dateB.localeCompare(dateA);
            });

            const bestMatch = searchResults.length > 0 ? searchResults[0] : null;

            if (bestMatch) {
                // Compare cleaned query (e.g. "squidgame") with result ("squidgame")
                const normalizedInput = normalizedQuery;
                const normalizedMatch = normalize(bestMatch.name);

                // Check if it's an exact match (ignoring case & punctuation)
                const isExact = normalizedInput === normalizedMatch;

                if (isExact) {
                    let finalPoster = getPosterUrl(bestMatch.poster_path);

                    // If user specified a season, try to fetch specific season poster
                    if (targetSeason !== null) {
                        try {
                            const seasonDetails = await getSeasonDetails(bestMatch.id, targetSeason);
                            if (seasonDetails && seasonDetails.poster_path) {
                                finalPoster = getPosterUrl(seasonDetails.poster_path);
                                console.log(`[Season Logic] Found season ${targetSeason} poster for ${bestMatch.name}`);
                            }
                        } catch (e) {
                            console.error("Failed to fetch season details", e);
                        }
                    }

                    return {
                        input: title, // Return "Squid Game Season 2" as the title
                        found: true,
                        tmdbId: bestMatch.id,
                        title: bestMatch.name,
                        posterUrl: finalPoster,
                        year: bestMatch.first_air_date ? bestMatch.first_air_date.substring(0, 4) : undefined,
                        isUncertain: false,
                        selectedSeason: targetSeason
                    };
                } else {
                    // It's a suggestion (found=false so it goes to "Uncertain" list, but data is there)
                    return {
                        input: title,
                        found: false,
                        tmdbId: bestMatch.id,
                        title: bestMatch.name, // This acts as the suggested title
                        posterUrl: getPosterUrl(bestMatch.poster_path),
                        year: bestMatch.first_air_date ? bestMatch.first_air_date.substring(0, 4) : undefined,
                        isUncertain: true,
                        suggestion: bestMatch.name
                        // Don't pass selectedSeason for suggestions to keep it simple, or maybe we should?
                        // For now, only exact matches get season logic applied automatically.
                    };
                }
            }

            return {
                input: title,
                found: false
            };
        })
    );

    return results;
}

export async function enrichDramas(dramas: IdentifiedDrama[]): Promise<EnrichedDrama[]> {
    const enriched = await Promise.all(
        dramas.map(async (drama) => {
            if (!drama.found || !drama.tmdbId) {
                return drama as EnrichedDrama;
            }

            // Always fetch series details for genres/keywords/default runtime
            const seriesDetails = await getSeriesDetails(drama.tmdbId);
            if (!seriesDetails) return drama as EnrichedDrama;

            // Calculate base runtime (series average)
            let avgRuntime = 60;
            if (seriesDetails.episode_run_time && seriesDetails.episode_run_time.length > 0) {
                const sum = seriesDetails.episode_run_time.reduce((a, b) => a + b, 0);
                avgRuntime = Math.round(sum / seriesDetails.episode_run_time.length);
            }

            let finalEpisodeCount = seriesDetails.number_of_episodes || 0;
            let finalRuntime = avgRuntime;

            // If a specific season was selected, try to get specific stats
            if (drama.selectedSeason) {
                try {
                    const seasonDetails = await getSeasonDetails(drama.tmdbId, drama.selectedSeason);
                    if (seasonDetails && seasonDetails.episodes) {
                        finalEpisodeCount = seasonDetails.episodes.length;
                        // We could recalculate runtime if season episodes have specific runtimes, 
                        // but average series runtime is usually a safe enough proxy unless we want to sum up exact minutes.
                        // Let's stick to series avg runtime * season episode count for consistency unless season has 0 eps.
                    }
                } catch (e) {
                    console.error("Failed to fetch season stats", e);
                }
            }

            return {
                ...drama,
                episodeCount: finalEpisodeCount,
                runtime: finalRuntime,
                totalRuntime: finalEpisodeCount * finalRuntime,
                genres: seriesDetails.genres?.map(g => g.name) || [],
                keywords: seriesDetails.keywords?.results?.map(k => k.name) || [],
                cast: seriesDetails.credits?.cast?.slice(0, 15).map(c => ({
                    id: c.id,
                    name: c.name,
                    profilePath: getPosterUrl(c.profile_path)
                })) || []
            };
        })
    );

    return enriched;
}
