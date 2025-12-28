const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface TMDBSeries {
    id: number;
    name: string;
    original_name: string;
    poster_path: string | null;
    first_air_date: string;
    overview: string;
    vote_average: number;
    backdrop_path: string | null;
    origin_country: string[];
    original_language: string;
}

export interface TMDBSeason {
    id: number;
    name: string;
    poster_path: string | null;
    season_number: number;
    air_date: string;
}

export async function searchSeries(query: string): Promise<TMDBSeries[]> {
    if (!TMDB_API_KEY) {
        console.error("TMDB_API_KEY is missing via process.env");
        throw new Error("TMDB_API_KEY is not defined");
    }

    // Determine if it's a v4 Bearer Token (long) or v3 API Key (short)
    const isBearer = TMDB_API_KEY.length > 60; // Tokens are usually much longer than 32-char hex keys

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // Add Authorization header if using Bearer token (v4)
    if (isBearer) {
        headers["Authorization"] = `Bearer ${TMDB_API_KEY}`;
    }

    // Construct URL: Use api_key param ONLY if it's a v3 short key
    const url = new URL(`${TMDB_BASE_URL}/search/tv`);
    if (!isBearer) {
        url.searchParams.append("api_key", TMDB_API_KEY);
    }
    url.searchParams.append("query", query);
    url.searchParams.append("language", "en-US");
    url.searchParams.append("page", "1");

    console.log(`[TMDB] Key Length: ${TMDB_API_KEY.length}, Method: ${isBearer ? "Bearer" : "Query Param"}`);

    try {
        const response = await fetch(url.toString(), {
            headers,
            next: { revalidate: 3600 }
        });

        console.log(`[TMDB] Searching for "${query}" -> Status: ${response.status}`);

        if (!response.ok) {
            console.error(`TMDB API Error: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();

        // Filter for Korea-specific results (origin_country includes 'KR' OR language is 'ko')
        const koreanSeries = (data.results || []).filter((series: TMDBSeries) => {
            const isKoreanCountry = series.origin_country?.includes("KR");
            const isKoreanLang = series.original_language === "ko";
            return isKoreanCountry || isKoreanLang;
        });

        console.log(`[TMDB] Found ${data.results?.length || 0} results for "${query}", filtered to ${koreanSeries.length} K-Dramas`);

        return koreanSeries;
    } catch (error) {
        console.error("Error searching TMDB:", error);
        return [];
    }
}

export async function getSeasonDetails(seriesId: number, seasonNumber: number): Promise<TMDBSeason | null> {
    if (!TMDB_API_KEY) return null;

    const isBearer = TMDB_API_KEY.length > 60;
    const url = new URL(`${TMDB_BASE_URL}/tv/${seriesId}/season/${seasonNumber}`);
    if (!isBearer) {
        url.searchParams.append("api_key", TMDB_API_KEY);
    }
    url.searchParams.append("language", "en-US");

    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (isBearer) headers["Authorization"] = `Bearer ${TMDB_API_KEY}`;

    try {
        const response = await fetch(url.toString(), {
            headers,
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`[TMDB] Failed to fetch season ${seasonNumber} for show ${seriesId}: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (e) {
        console.error("[TMDB] Error fetching season details:", e);
        return null;
    }
}

export function getPosterUrl(path: string | null, size: "w92" | "w185" | "w500" = "w185") {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
