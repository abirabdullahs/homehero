# HomeHero

Live site: https://your-live-site-url.example/  <!-- Replace with the actual URL -->

## Key Features

- Dark & Light Mode with persistent preference (localStorage) and OS-preference detection — polished theme-aware UI across the site.
- Responsive Service Listing and Detail pages with high-quality images, price, rating, and provider information.
- Booking system: authenticated users can book services (booking form + persistence via backend API).
- Reviews & Ratings: users can submit reviews and star ratings for services; aggregate rating shown on service detail page.
- Authentication (Firebase): Email/password and Google Sign-In, profile pages, and protected routes.
- Provider tools: add new services, manage (edit/delete) your services (My Services), and view bookings (My Bookings).
- Consistent design system: unified button components and theme-aware components built with Tailwind CSS and DaisyUI.

## Tech / Stack

- React
- Tailwind CSS (v4) and DaisyUI
- Firebase Authentication
- Axios for API requests
- Backend: REST endpoints (used via VITE_SERVER env var)

## Quick Notes

- Replace the Live site URL above with your deployed URL.
- Environment variables: ensure `VITE_SERVER` is set to your backend server URL when running locally or in production.

## How to run locally (developer)

1. Install dependencies

```powershell
cd "f:\web projects\PH-assignment\homehero"
npm install
```

2. Start dev server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

If you want, I can also add a short section describing the main pages and components, or update the README with your live URL. Let me know and I'll update it now.