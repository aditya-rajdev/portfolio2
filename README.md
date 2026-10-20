# FRAME — Cinematic Video Editor Portfolio

A responsive React + TypeScript + Vite portfolio starter with GSAP/ScrollTrigger reveals, a cinematic hero, interactive sample projects, project detail modal, showreel modal, services, about, process, and a mailto-based contact form.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run typecheck
npm run build
npm run preview
```

## Personalize first

Edit `src/data/site.ts`:
- `brand`, `name`, `email`
- Social profile URLs
- `heroVideo` and `heroPoster`
- `showreelVideo`
- Project titles, descriptions, years, role, tools, image URLs and optional video URLs

The included project titles and image selections are **sample concepts**, not claims of real client work. Replace them with your own projects before publishing. The image URLs are remote illustrative images; replace with properly licensed assets for production.

## Local video assets

Place compressed files inside `public/media/`, for example:
- `public/media/hero.mp4`
- `public/media/showreel.mp4`
- `public/media/project-01.mp4`

Then update the corresponding values in `src/data/site.ts`. Vite serves `public/media/showreel.mp4` at `/media/showreel.mp4`.

The hero video uses muted, looping inline playback with a poster image. If browser autoplay is blocked, the poster remains as a visual fallback. Reduced-motion preferences hide the hero video.

## Showreel behavior

The showreel button opens a cinematic modal. Until `showreelVideo` is configured, the modal explains how to add a real video rather than pretending a video is playing.

## Contact form

The form validates name, email, and project brief in the browser, then opens the visitor's email application with a prefilled message using `site.email`. This is not a server-backed form. For production submissions without relying on the visitor's mail app, connect a backend or form service and add spam protection.

## Notes

- External hero footage and remote images need network access. For stable production delivery, download properly licensed media and serve optimized local assets or use a trusted CDN.
- No client names, testimonials, awards, or performance metrics are fabricated.
- Check mobile layouts, video rights, and contact details before deployment.
