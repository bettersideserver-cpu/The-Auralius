THE AURALIUS — static website
=============================

index.html is the entry point. No server, no Node, no build step needed.

TO SEE IT RIGHT NOW
Double-click index.html. It opens in your browser and works offline.

TO GET A PUBLIC LINK
Easiest: go to  https://app.netlify.com/drop  and drag THIS WHOLE FOLDER onto
the page. You get a live https link in a few seconds, free.

On your own hosting: upload the CONTENTS of this folder (index.html, assets,
images, fonts, videos and the loose .mp4/.webm files) into your web root —
usually public_html, www, or htdocs. Then open your domain.

This build uses relative paths, so it works from a domain root
(example.com), a sub-folder (example.com/auralius/), or straight off disk.
Keep every file together in the same folder and the structure unchanged.

NOTES
- Videos (hero-loop, mist-scrub) are the big files. Keep them — the hero
  background and the scroll-through mist sequence use them.
- Fonts load from Google Fonts, so first paint online is best with internet.
- _redirects is a Netlify helper. Harmless on any other host.
- The ENQUIRE form is front-end only in this export; wire it to your own
  form service (Formspree, Google Form, your CRM) before going live.
