THE AURALIUS — static website export
====================================

What this is
------------
The complete site as plain static files. No build step, no server-side code,
no Node needed. Everything it loads (fonts for the headings come from Google
Fonts, so a connection helps) sits in this folder.

To view it locally
------------------
Double-click index.html. It opens in any browser straight from disk.

To put it online
----------------
Upload the CONTENTS of this folder (not the folder itself) to any static host:

  Netlify / Cloudflare Pages / Vercel  — drag this folder onto their dashboard
  GitHub Pages                         — commit the contents to the repo
  Any cPanel / FTP host                — upload into public_html

A _redirects file is included for Netlify and Cloudflare Pages, so deep links
fall back to the single page instead of 404ing. Other hosts ignore it safely.

What's inside
-------------
  index.html          the page
  assets/site.js      original site export, with the estate scene connected below
  assets/estate-scene.js   editable scroll transitions and road frame player
  assets/estate-scene.css  pinned scene, image alignment and responsive styling
  evening.webp        the first hillside image revealed through the clouds
  Evening-1.webp      the second hillside image, with the villa lights on
  night.webp          the final hillside image
  road/               241 transparent PNG frames, played in a loop at night
  images/             stills and photography
  hero-loop.*         the hero video, in two formats for browser coverage
  mist-scrub.*        legacy asset; the estate no longer loads this video
  fonts/, videos/     supporting assets
  favicon.ico, og-image.png

Editing text or images
----------------------
Swap a picture by replacing the file in images/ with one of the same name.
Copy lives inside assets/site.js, which is minified — editing it by hand is
possible but unpleasant. Come back to Runable for wording or layout changes
and export again.

Evening-to-night scroll scene
----------------------------
The estate section stays pinned for four viewport heights of scrolling:
  1. Clouds dissolve to evening.webp (1.5–24% of the scroll).
  2. Evening-1.webp starts appearing as the clouds part (12–30%).
  3. night.webp crossfades in (57–79%), with snow appearing as night settles.
  4. Once night is fully revealed, road/Comp 1_00000.png through
     Comp 1_00240.png loop at 24 fps. Scrolling back reverses the image
     transitions and resets the road loop. Leaving the section pauses it.

Adjust those ranges in assets/estate-scene.js and the section height in
assets/estate-scene.css. The road frames share a 16:9 composition with the
center-cropped stills; keep the layers together when adjusting their framing.
The player keeps only a rolling buffer of decoded frames in memory. Reduced
motion keeps the scroll-controlled still fades and disables snow and the loop.
No build step or video conversion is needed; direct index.html viewing works.
