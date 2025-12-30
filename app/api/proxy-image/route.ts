
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return new NextResponse("Missing URL parameters", { status: 400 });
    }

    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
                "Cache-Control": "public, max-age=31536000, immutable",
                "Access-Control-Allow-Origin": "*", // Explicitly allow all origins
            },
        });
    } catch (error) {
        console.error("Error proxying image:", error);
        return new NextResponse("Failed to fetch image", { status: 500 });
    }
}
