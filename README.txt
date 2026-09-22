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
  assets/site.js      the whole site — markup, styles and motion, in one file
  images/             stills and photography
  hero-loop.*         the hero video, in two formats for browser coverage
  mist-scrub.*        the scroll-scrubbed mist clip
  fonts/, videos/     supporting assets
  favicon.ico, og-image.png

Editing text or images
----------------------
Swap a picture by replacing the file in images/ with one of the same name.
Copy lives inside assets/site.js, which is minified — editing it by hand is
possible but unpleasant. Come back to Runable for wording or layout changes
and export again.
