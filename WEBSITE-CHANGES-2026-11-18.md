# Website changes completed — 18 November 2026

Request: `Website changes  (1).pdf` (one page).

| Request | Completed change |
| --- | --- |
| 1. Remove the names in the pictured section | Removed the four-name leadership strip and its role labels from the homepage developer section. |
| 2. Add text after “Gated 9 Acres” | The estate fact now reads “Gated, 9 acres · Mixed-Use Development Project”. |
| 3a. Remove Stories and Culture | Removed that entire card from the homepage group section and removed the now-unnecessary reference to former media ventures in its introduction. |
| 3b. Add Amritsar below Apollo Hospital | Added “Amritsar” directly below the existing Apollo Cradle name. Retained the hospital’s established name and the leadership-association description. |
| 3c. Add Jujhar delivery date | Added “Delivery: June 2027” directly beneath Jujhar IT Building in the group list. Its project card already had the date and retains it. |
| 4a. In-villa comforts, point 9 | Added “24/7 electricity supply” to the electrical and lighting description. |
| 4b. In-villa comforts, point 13 | Changed the heading to “Handmade paintings” and explicitly highlighted handmade paintings in the description. |
| 4c. In-villa comforts, point 14 | Changed the heading to “Bespoke interiors” and added bespoke interiors to the furnished-interiors description. |
| 5. Correct the Location Surya Realty logo | Replaced the approximate drawn symbol/text in the Location footer with the existing approved Surya Realty logo image, displayed in white for contrast against the dark footer. |
| 6. Dedicated CSR section or page | Created the dedicated `/csr/` page, titled “Building with responsibility”. Following the user’s subsequent request, the homepage CSR section was removed and links were added from the homepage and all page footers. |

## CSR sources

The CSR section uses page 23 of `Surya Realty _ Profile.pdf`:

- Five gaushalas across Amritsar and Kartarpur, providing shelter and care for over 600 cows.
- An old-age home in Amritsar offering free accommodation and care to elderly residents.

The accompanying community-care illustration was extracted from that same page and saved as lossless WebP. It is labelled as an illustration in its image description.

## Verification

- JavaScript syntax checks passed for the shared additions, homepage bundle and Location bundle.
- Existing section-mount and Location viewer interaction checks passed.
- Generated markup checks verified all six request groups and every sub-item, including the removal of the leadership strip and media card, the new group captions, the three amenities edits and both CSR initiatives.
- The logo and CSR image paths resolve to existing files.
- Homepage, Amenities and Location cache references were refreshed.
- Plans, floor drawings, other hero media and page navigation were not changed.
- Browser visual verification was unavailable in this session; no deployment was performed.

## Remaining requested changes

None. All changes requested in this PDF have been implemented locally.

## CSR page follow-up

Moved the same CSR content and illustration to `csr/index.html`, with responsive styling in `csr/csr.css`, site navigation and the correct Surya Realty footer logo. The homepage no longer mounts a CSR section. All local page links and assets resolve, all modified JavaScript passes syntax checks, and the existing section-mount checks pass. Browser visual verification remains unavailable.
