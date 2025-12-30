import { EnrichedDrama } from "@/app/actions";
import { CustomGenre, getTopGenres } from "./genre-mapping";

export type VibeType = "wanderer" | "detective" | "healing" | "romantic" | "time";

interface GenreCount {
    genre: CustomGenre;
    count: number;
    percentage: number;
}

export function calculateVibe(dramas: EnrichedDrama[]): VibeType {
    // Calculate genre frequencies
    const genreCounts = new Map<CustomGenre, number>();
    let totalGenres = 0;

    dramas.forEach(drama => {
        const genres = getTopGenres(drama);
        genres.forEach(genre => {
            genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
            totalGenres++;
        });
    });

    // Convert to array with percentages
    const genreStats: GenreCount[] = Array.from(genreCounts.entries()).map(([genre, count]) => ({
        genre,
        count,
        percentage: (count / totalGenres) * 100
    })).sort((a, b) => b.count - a.count);

    // Get top genre
    const topGenre = genreStats[0];
    const top3Genres = genreStats.slice(0, 3).map(g => g.genre);
    const uniqueGenres = genreStats.length;

    // Vibe Detection Logic

    // 1. WANDERER - Diverse mix (8+ genres, no single dominant)
    if (uniqueGenres >= 6 && topGenre.percentage < 35) {
        return "wanderer";
    }

    // 2. TIME TRAVELER - Historical dominant (>35% or top genre or in Top 3)
    const historicalPercent = genreCounts.get("Historical") || 0;
    if (topGenre.genre === "Historical" || top3Genres.includes("Historical") || (historicalPercent / totalGenres) * 100 > 35) {
        return "time";
    }

    // 4. HEALING SOUL - Slice of Life/Medical/Youth
    const healingGenres = ["Slice of Life", "Medical", "Youth", "Comedy"];
    const healingCount = healingGenres.reduce((sum, g) => sum + (genreCounts.get(g as CustomGenre) || 0), 0);
    const healingPercent = (healingCount / totalGenres) * 100;

    // Boost chances if specific healing dramas are in Top 3
    const healingDramas = ["When Life Gives You Tangerines", "Our Unwritten Seoul"];
    const hasHealingFavorite = dramas.slice(0, 3).some(d => healingDramas.some(hd => (d.title || "").includes(hd)));
    const healingThreshold = hasHealingFavorite ? 10 : 25;

    if (healingPercent > healingThreshold || top3Genres.includes("Slice of Life") || top3Genres.includes("Medical")) {
        return "healing";
    }

    // 3. DETECTIVE - Thriller/Mystery/Legal heavy
    const detectiveGenres = ["Thriller", "Legal", "Action", "Sci-Fi"];
    const detectiveCount = detectiveGenres.reduce((sum, g) => sum + (genreCounts.get(g as CustomGenre) || 0), 0);
    const detectivePercent = (detectiveCount / totalGenres) * 100;

    // Boost chances if Trigger, Mercy for None, OR As You Stood By are in Top 3
    // We assume the first 3 dramas in the list are the user's "Top 3 favorites"
    const detectiveDramas = ["Trigger", "Mercy for None", "As You Stood By"];
    const top3Titles = dramas.slice(0, 3).map(d => (d.title || "").toLowerCase());

    // Check if ANY of the detective favorites are present using 'some' (OR logic)
    const hasDetectiveFavorite = detectiveDramas.some(target =>
        top3Titles.some(title => title.includes(target.toLowerCase()))
    );

    const detectiveThreshold = hasDetectiveFavorite ? 10 : 30;

    if (detectivePercent > detectiveThreshold || top3Genres.includes("Thriller") || top3Genres.includes("Legal")) {
        return "detective";
    }

    // 5. ROMANTIC - Romance/Comedy/Melodrama (default for most K-Drama watchers)
    const romanticGenres = ["Romance", "Comedy", "Melodrama"];
    const romanticCount = romanticGenres.reduce((sum, g) => sum + (genreCounts.get(g as CustomGenre) || 0), 0);
    const romanticPercent = (romanticCount / totalGenres) * 100;

    if (romanticPercent > 25 || topGenre.genre === "Romance") {
        return "romantic";
    }

    // Final fallback
    return "romantic"; // Most K-Drama watchers fit here!
}
