
import SummaryCard from "@/components/Wrapped/SummaryCard";
import { identifyDramas, enrichDramas, EnrichedDrama } from "@/app/actions";
import { calculateVibe } from "@/lib/vibe-calculator";
import { getTopGenres } from "@/lib/genre-mapping";

// Real input titles to simulate a user's year
const DEBUG_TITLES = [
    "Queen of Tears",
    "Lovely Runner",
    "Marry My Husband",
    "Twinkling Watermelon",
    "Moving",
    "The Glory",
    "Alchemy of Souls",
    "Business Proposal",
    "King the Land",
    "Doctor Slump",
    "Welcome to Samdal-ri",
    "Gyeongseong Creature"
];

export default async function DebugSummaryPage() {
    // 1. Identify
    const identified = await identifyDramas(DEBUG_TITLES);
    // 2. Enrich
    const dramas: EnrichedDrama[] = await enrichDramas(identified);

    // Sort logic (same as flow - usually just input order or recent, here we keep input order)

    // Define Top 3 (First 3 for debug purposes)
    const topDramas = dramas.slice(0, 3);

    // Calculate Real Stats (Same logic as WrappedFlow.tsx)
    const dramaCount = dramas.length;
    const episodeCount = dramas.reduce((acc, drama) => acc + (drama.episodeCount || 16), 0);
    const totalMinutes = dramas.reduce((acc, drama) => acc + (drama.totalRuntime || (16 * 60)), 0);
    const totalHours = Math.round(totalMinutes / 60);

    // Calculate Top Genres
    const allGenres = dramas.flatMap(d => getTopGenres(d));
    const genreCounts = allGenres.reduce((acc, g) => {
        acc[g] = (acc[g] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const topGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([g]) => g);

    // Calculate Vibe
    const vibeKey = calculateVibe(dramas);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8 overflow-auto">
            <div className="scale-[0.5] origin-top-center h-[1920px]"> {/* Scale down to fit screen */}
                <SummaryCard
                    dramas={dramas}
                    topDramas={topDramas}
                    stats={{
                        dramaCount,
                        episodeCount,
                        totalHours
                    }}
                    vibeKey={vibeKey}
                    topGenres={topGenres}
                    username="Debug User"
                />
            </div>

            <div className="fixed top-4 left-4 bg-white p-4 rounded shadow z-50 max-w-sm">
                <p className="font-bold mb-2">Debug Mode (Real Data)</p>
                <p className="text-sm mb-1">Fetching {dramas.length} dramas from TMDB...</p>
                <p className="text-sm mb-2 text-green-600">✔ Using live calculations</p>
                <p className="text-xs text-gray-500">Edit components/Wrapped/SummaryCard.tsx to see changes.</p>
            </div>
        </div>
    );
}
