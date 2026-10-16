# Auralius website changes — 14 October 2026

## Completed and remaining items

| PDF item | Status | Result |
| --- | --- | --- |
| 1. Highlight elevation | Completed | Added a prominent homepage facts strip with “Above 4,700 ft.” and “Above sea level”. |
| 2. RERA registration | Completed | Added `RERAHPSOP09210117`, transcribed from the technical booklet cover. |
| 3. Actual photograph in the homepage banner | Pending | No verified actual Auralius project photograph was found. The supplied aerial images and project visuals are renders. The homepage hero media remains unchanged. Supply an actual site photograph to complete this item. |
| 4. All projects, statuses and short descriptions | Completed | Added all six real estate projects from the updated company profile. Delivered: The Grand Walk, Alpha International City and Opus One. Upcoming/in progress: The Auralius, Group Housing Project in Tangori and Jujhar IT Building. The Auralius delivery is listed as November 2027. |
| 5. Group companies at the end of the homepage | Completed | Added real estate, hospitality, family entertainment, connectivity, media and healthcare categories with the named businesses/projects in the profile. Opus One is included under Real Estate. |
| 6. Move Fully Furnished higher | Completed | Moved it directly after the estate scene, before the later lifestyle sections. |
| 7. Update Meet the Developer | Completed | Updated the homepage developer introduction and added the four leadership names and roles from the new profile. |
| 8. Replace Series by Marriott with Domino’s | Completed | Replaced the Location landmark card and installed an official vector Domino’s logo. |
| 9. Improve Location technical block plan | Partially completed | Made the drawing wider and added an enlarged modal with 100–300% zoom, reset, scrolling, close, focus return and download. The supplied map itself is only 1016 × 835 pixels; a higher-resolution image or vector drawing is still needed to make the underlying labels genuinely sharper. The Plans page was not changed. |
| 10. Add more amenities | Completed | The Amenities page now lists all 24 amenities and services supplied in the follow-up reference image, alongside the fourteen in-villa specification groups. |
| 11. Follow brochure sequence | Completed | Updated from the follow-up image: 12 amenities down the left column, then 12 down the right. Mobile stacks all 24 in that same reading order. The fourteen in-villa specifications retain their technical booklet sequence. |
| 12. Improve floor-plan resolution | Completed 16 October | Following the new authorization, replaced the displayed floor plans using the high-resolution Auralius floormaps sources. Fifteen full-resolution drawings cover five blocks and three levels; all 36 block/unit/floor selections are mapped. Lossless WebP conversion was verified pixel-for-pixel. |
| 13. Improve floor-plan labels and dimensions | Completed 16 October | Enlarged the page previews and added zoom, original-size viewing, drag/scroll navigation, fit-to-view, keyboard zoom and full-resolution downloads. Source dimensions and annotations were preserved. |

## Source details

- Change list: `C:/Users/ADMIN/Downloads/AURALIUS WEBSITE CHANGES.pdf`.
- Updated company profile: `D:/auralis/Surya Realty _ Profile (1).pdf`, pages 4–8 (company and leadership), 15 (group companies) and 17–22 (six projects).
- Technical booklet: `D:/auralis/The Auralius _ Technical Booklet _ Jul 28.pdf`, pages 1 (RERA), 5 (estate block plan) and 35 (villa specifications).
- The Opus One, Tangori and Jujhar project visuals were extracted from the updated profile and saved as lossless WebP images at their original resolution.
- Placeholder copy such as “XX Acres”, unspecified apartment sizes and lorem ipsum in the profile was omitted. Short descriptions use only the stated project details.
- Domino’s logo source: [Domino’s official media assets](https://media.dominos.com/multimedia/logos/), official SVG logo archive downloaded on 14 October 2026.

## Verification

- JavaScript syntax check passed.
- Section mounting checks passed: no duplicate sections or repeated DOM moves on subsequent updates; Fully Furnished appears after the estate scene; group businesses appear after the enquiry section.
- Location viewer event checks passed in a DOM mock: opening, zoom limits, reset, closing, focus return and no duplicate handlers.
- Generated HTML contains six project cards and fourteen villa-feature cards, with unique element IDs.
- All 19 local image/link targets in the generated additions exist.
- At the initial 14 October handoff, SHA-256 comparison confirmed all 53 protected files were unchanged. Plans were subsequently updated with explicit authorization on 16 October; see the follow-up below.
- Browser visual preview was unavailable in this session. Desktop/mobile CSS was reviewed, but a rendered browser check is still recommended before publishing.

## Files changed

- `assets/brochure-updates.js`
- `assets/brochure-updates.css`
- `index.html`
- `amenities/index.html`
- `location/auralius-location-static/index.html`
- New project visuals in `images/projects/`
- New logo at `location/auralius-location-static/images/brands/dominos.svg`

Changes are saved locally; no deployment was performed.

## Follow-up: amenities reference image

The 24-item amenities list was updated from the image supplied after the PDF changes. The section count now reads 24. The Amenities hero and all Plans files were left unchanged. Updated `amenities/assets/index-BO5lQLjI.js`, added `amenities/assets/amenities-catalogue.css`, and refreshed the Amenities page asset URLs. JavaScript syntax and the list count/order checks passed.

## Follow-up: high-resolution floor drawings — 16 October 2026

The user supplied `Auralius floormaps` and explicitly authorized the previously excluded Plans changes.

- Source files: booklet images 7/8 (Block 1), 10/11 (Block 2), 13/14 (Block 3), 16/17 (Block 4), 19/20 (Block 5).
- Each source block provides a common drawing for its named units. The page identifies this rather than claiming separate unit-specific drawings. The unit selector is retained.
- Split ground/first/attic drawings from their respective page halves and trimmed only exterior whitespace, retaining source titles and annotations. Original linework and text were not redrawn or sharpened artificially.
- Full-resolution drawings range from 4,067 to 5,405 pixels per side. Lossless WebP files were decoded and compared against the extracted source pixels; all fifteen matched exactly.
- Smaller preview images load on the page; opening the viewer loads the full-resolution asset. Original-size viewing shows one source pixel per CSS pixel.
- Verified all 36 valid block/unit/floor selections, existing asset paths, disabled unavailable units, zoom, fit, original-size, keyboard zoom, close/focus return and duplicate-mount prevention using a DOM mock. JavaScript syntax checks passed. Browser layout was not visually verified in this session.
- Plans hero/site-plan content and other pages were not changed by this follow-up.
- Source mapping and dimensions: `plans/images/floormaps/sources.json`.
- Modified: `assets/plans-brochure.js`, `plans/index.html`. Added: `plans/assets/floor-drawing-viewer.css` and the drawings/previews in `plans/images/floormaps/`.
