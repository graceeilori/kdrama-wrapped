"use server";

import { searchSeries, getPosterUrl, getSeasonDetails, TMDBSeries } from "@/lib/tmdb";

export interface IdentifiedDrama {
    input: string;
    found: boolean;
    tmdbId?: number;
    title?: string;
    posterUrl?: string | null;
    year?: string;
    isUncertain?: boolean; // If fuzzy match or simple check
    suggestion?: string; // The suggested title if found=false but bestMatch exists
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

            // Sort by year descending (2025 -> 2024 -> ...)
            // Prioritize recent releases as requested
            searchResults.sort((a, b) => {
                const dateA = a.first_air_date || "0000";
                const dateB = b.first_air_date || "0000";
                return dateB.localeCompare(dateA);
            });

            const bestMatch = searchResults.length > 0 ? searchResults[0] : null;

            if (bestMatch) {
                // Normalization helper: lowercase + remove all non-alphanumeric chars (punctuation/spaces)
                const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

                // Compare cleaned query (e.g. "squidgame") with result ("squidgame")
                const normalizedInput = normalize(query);
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
                        isUncertain: false
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
