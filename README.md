# K-Drama Wrapped 2025 🎬

An interactive year-in-review experience for K-Drama enthusiasts. Enter your watched list, and get a personalized "Wrapped" story with stats, top genres, and your unique viewing "Vibe". Inspired by Spotify Wrapped.

## Features 

* **Smart Title Recognition**: Fuzzy matching algorithm handles typos, alternative titles, and formatting variations
* **TMDB Integration**: Automatically fetches comprehensive show metadata including genres, ratings, and poster images
* **Vibe Algorithm**: Custom genre weighting system that analyzes viewing patterns to determine personality archetypes
* **Interactive Results**: Swipe/tap through your personalized statistics with smooth animations
* **Shareable Graphics**: Generate and download your wrapped summary as an image

## Technologies & Architecture 

### Frontend Stack

* **Next.js 14 (App Router)**: React framework with server components
* **TypeScript**: Development
* **Tailwind CSS**: Styling
* **Framer Motion**: Animations and gesture handling

### Data & APIs
* **TMDB API**: Drama metadata and genre information (https://www.themoviedb.org/documentation/api)
* **Server Actions**: Secure API proxying and data processing
* **html2canvas**: Client-side image generation for sharing

### Deployment & Analytics
* **Vercel**: Edge network deployment for optimal performance
* **Vercel Analytics**: User engagement and interaction tracking

## Try it out!

Experience your own K-Drama Wrapped at [kdramawrapped.com](https://kdramawrapped.com).
