# TravelTrucks 🚐

A modern campervan rental web application built with Next.js and TypeScript. Browse, filter, and book campervans with an intuitive and responsive interface.

## Description

TravelTrucks is a frontend web application for a campervan rental company. Users can explore a catalog of available campervans, filter them by location, body type, engine, and transmission, view detailed information about each vehicle, browse photo galleries, read reviews, and submit booking requests.

## Key Features

- 🔍 **Filter campervans** by location, body form, engine type, and transmission
- ♾️ **Infinite scroll catalog** with Load More pagination (4 campers per page)
- 🖼️ **Interactive photo gallery** with Swiper thumbs and fullscreen lightbox (zoom support)
- ⭐ **User reviews** with 5-star rating display
- 📋 **Detailed camper info** including vehicle specs and amenities
- 📅 **Booking form** with server submission and success/error notifications
- 🔗 **SEO-friendly** with per-page metadata and Open Graph tags
- ⚡ **SSR prefetching** with TanStack Query hydration on the details page
- 💾 **Booking draft persistence** via Zustand store

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query) — data fetching, caching, infinite queries
- [Zustand](https://zustand-demo.pmnd.rs/) — client state management
- [Swiper](https://swiperjs.com/) — image gallery with thumbnails
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com/) — fullscreen image viewer
- [Axios](https://axios-http.com/) — HTTP client
- [CSS Modules](https://github.com/css-modules/css-modules) — scoped styling
- [react-hot-toast](https://react-hot-toast.com/) — notifications
- [clsx](https://github.com/lukeed/clsx) — conditional class names

## Installation

### Prerequisites

- Node.js 18+
- npm

> The app uses a public API at `https://campers-api.goit.study` — no environment variables needed.

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/mykhailo-moskalov/1-travel-trucks.git
cd 1-travel-trucks
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Pages

| Route                 | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `/`                   | Home page with a call-to-action banner                  |
| `/catalog`            | Camper catalog with filters and Load More               |
| `/catalog/[camperId]` | Detailed camper page with gallery, reviews, and booking |

### Filtering

Use the sidebar on the catalog page to filter campervans by:

- **Location** — type a city name and click Search
- **Camper form** — Alcove, Panel Van, Integrated, Semi Integrated
- **Engine** — Diesel, Petrol, Hybrid, Electric
- **Transmission** — Automatic, Manual

Click **Search** to apply filters or **Clear Filters** to reset.

### Booking

On a camper's detail page, scroll down to the booking form, fill in your name and email, and click **Send**. A notification will confirm whether your booking was successful.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home page
│   ├── catalog/
│   │   ├── page.tsx      # Catalog page
│   │   └── [camperId]/   # Camper details page
├── components/           # Reusable UI components
├── lib/
│   ├── api/              # Axios client and API functions
│   ├── store/            # Zustand stores
│   └── utils.ts          # Utility functions
└── types/                # TypeScript interfaces and enums
```

## Deployment

The application is deployed on Vercel:
🔗 **[Live Demo](https://1-travel-trucks.vercel.app)**

## Author

**Mykhailo Moskalov**

- GitHub: [@mykhailo-moskalov](https://github.com/mykhailo-moskalov)
