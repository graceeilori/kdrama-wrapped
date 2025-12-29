import { EnrichedDrama } from "@/app/actions";

export type CustomGenre =
    | "Romance"
    | "Sci-Fi"
    | "Comedy"
    | "Thriller"
    | "Fantasy"
    | "Action"
    | "Historical"
    | "Slice of Life"
    | "Melodrama"
    | "Medical"
    | "Legal"
    | "Legal"
    | "School"
    | "Youth"
    | "Drama"; // Fallback

// Keywords that strongly signal a genre
const KEYWORD_MAP: Record<string, CustomGenre> = {
    // Historical
    "joseon": "Historical",
    "joseon dynasty": "Historical",
    "joseon dynasty (1392-1910)": "Historical",
    "historical": "Historical",
    "period drama": "Historical",
    "dynasty": "Historical",
    "royal": "Historical",
    "royal family": "Historical",
    "sageuk": "Historical",

    // Fantasy
    "time travel": "Fantasy",
    "supernatural": "Fantasy",
    "gumiho": "Fantasy",
    "ghost": "Fantasy",
    "mythology": "Fantasy",
    "immortal": "Fantasy",
    "reincarnation": "Fantasy",

    // Thriller
    "thriller": "Thriller",
    "murder": "Thriller",
    "serial killer": "Thriller",
    "detective": "Thriller",
    "police": "Thriller",
    "investigation": "Thriller",
    "crime": "Thriller",
    "mystery": "Thriller",
    "mysterious": "Thriller",
    "suspense": "Thriller",
    "psychopath": "Thriller",

    // Sci-Fi
    "alien": "Sci-Fi",
    "robot": "Sci-Fi",
    "artificial intelligence": "Sci-Fi",
    "future": "Sci-Fi",
    "distopia": "Sci-Fi",
    "zombie": "Sci-Fi", // Often grouped here or Horror/Thriller

    // Medical
    "doctor": "Medical",
    "hospital": "Medical",
    "surgery": "Medical",
    "nurse": "Medical",

    // Legal
    "lawyer": "Legal",
    "prosecutor": "Legal",
    "judge": "Legal",
    "court": "Legal",

    // Melodrama
    "melodrama": "Melodrama",
    "affair": "Melodrama",
    "infidelity": "Melodrama",
    "tragedy": "Melodrama",
    "betrayal": "Melodrama",
    "secret": "Melodrama",
    "scandal": "Melodrama",
    "makjang": "Melodrama",

    // Romance
    "romance": "Romance",
    "first love": "Romance",
    "marriage": "Romance",
    "dating": "Romance",
    "love triangle": "Romance",

    // School
    "high school": "School",
    "student": "School",
    "university": "School",
    "campus": "School",
    "bully": "School",

    // Youth
    "youth": "Youth",
    "coming of age": "Youth",
    "dream": "Youth",
    "college": "Youth", // Often overlaps but fits the 'young adult' vibe
    "20s": "Youth",

    // Action
    "gangster": "Action",
    "mafia": "Action",
    "revenge": "Action", // Revenge often fits Action or Melodrama, prioritizing Action here
    "martial arts": "Action",
    "fight": "Action",
};

export function getTopGenres(drama: EnrichedDrama): CustomGenre[] {
    const tmdbGenres = drama.genres || [];
    const keywords = (drama.keywords || []).map(k => k.toLowerCase());

    // Set ensures uniqueness, insertion order preserves priority (Keywords first!)
    const foundGenres = new Set<CustomGenre>();

    // 1. Check Keywords first (Highest Priority)
    for (const k of keywords) {
        for (const [key, vibe] of Object.entries(KEYWORD_MAP)) {
            if (k.includes(key)) {
                foundGenres.add(vibe);
            }
        }
    }

    // 2. Check TMDB Genres (Secondary Priority)
    const genreNames = tmdbGenres.map(g => g.toLowerCase());

    if (genreNames.includes("scifi & fantasy") || genreNames.includes("sci-fi & fantasy")) {
        if (keywords.some(k => k.includes("tech") || k.includes("space") || k.includes("alien"))) {
            foundGenres.add("Sci-Fi");
        } else {
            foundGenres.add("Fantasy");
        }
    }

    if (genreNames.includes("action & adventure")) foundGenres.add("Action");
    if (genreNames.includes("crime") || genreNames.includes("mystery")) foundGenres.add("Thriller");
    if (genreNames.includes("comedy")) foundGenres.add("Comedy");

    // 3. Inference based on lack of specific matches
    if (foundGenres.size === 0) {
        if (keywords.some(k => k.includes("friend") || k.includes("neighbor") || k.includes("life"))) {
            foundGenres.add("Slice of Life");
        }
    }

    // Fallback if truly nothing found
    if (foundGenres.size === 0) {
        if (genreNames.includes("drama")) {
            // "Drama" generic usually implies Romance in KDrama land
            foundGenres.add("Romance");
        } else {
            foundGenres.add("Drama");
        }
    }

    // Convert Set to Array and return top 2
    return Array.from(foundGenres).slice(0, 2);
}

// Deprecated alias for backward compatibility until refactor is complete
export function getDominantGenre(drama: EnrichedDrama): CustomGenre {
    return getTopGenres(drama)[0];
}
