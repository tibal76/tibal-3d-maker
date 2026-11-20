# Project instructions

## Project overview

- This repository is a small French-language, single-page marketing website for Tibal 3D Maker.
- It is a static site built with plain HTML, CSS, and vanilla JavaScript. Do not introduce a framework or build tool unless the user explicitly requests it.
- The main entry point is `index.html`. Styling is centralized in `css/style.css`, and browser behavior is centralized in `js/script.js`.
- Site content and labels are primarily in French. Preserve the existing French tone, terminology, and accent characters.

## Source conventions

- Keep the page accessible and semantic: use appropriate landmarks, headings, labels, buttons, and links.
- Preserve the existing dark color palette and responsive layout. Reuse CSS custom properties from `:root` and existing component classes before adding new variables or styles.
- Keep CSS selectors and JavaScript simple and readable; prefer a small, surgical change over abstraction.
- Preserve or improve keyboard and assistive-technology behavior. Interactive controls must have visible focus states, meaningful accessible text, and correct button/link semantics.
- Use relative asset paths. Realization images belong in `assets/realizations/`; the logo belongs in `assets/logo/`.
- Keep external configuration in `js/script.js`'s `SITE_CONFIG` object. Update the HTML and JavaScript together if a link or external address is changed.
- Do not silently replace missing content or configuration with fake values. Use the existing placeholder or `onerror` behavior for external image fallback.

## JavaScript

- Use modern vanilla JavaScript supported by current browsers.
- Register DOM-dependent code in `DOMContentLoaded`, and guard DOM lookups when adding optional elements.
- Use `data-*` attributes for category/filter behavior and keep filter state synchronized across buttons and cards.
- Avoid dependencies, global libraries, inline event handlers, and nonessential runtime code.
- Preserve the current no-JavaScript fallback when a feature can degrade safely.

## HTML and content

- Maintain the document language as `lang="fr"` and keep metadata, titles, alt text, and visible text consistent.
- Keep navigation targets aligned with existing section IDs: `accueil`, `services`, `realisations`, `avis`, and `contact`.
- Use `target="_blank"` only for external links and always include `rel="noopener noreferrer"`.
- Ensure that all images have meaningful `alt` text, or an empty `alt` only when the image is purely decorative.

## Responsive and visual changes

- Inspect changes at desktop and mobile widths. Preserve the sticky header, section spacing, grid behavior, and existing `720px` breakpoint unless changing responsive behavior is explicitly requested.
- Do not use fixed viewport sizes or hide essential navigation/content for mobile.
- Preserve sufficient contrast and maintain visible hover, focus, active, and hidden states.

## Validation

- There is no package manifest, build, or automated test suite in the repository.
- For code changes, serve the project locally and verify the affected behavior in a browser; for example: `python -m http.server 8000` from the repository root.
- Check the page at a narrow and a wide viewport, and test realization filters, external links, image fallbacks, and the footer year when relevant.
- Inspect the browser console for JavaScript errors and verify that linked local CSS, JavaScript, and asset paths resolve.
- Do not claim tests passed unless a test command or browser check was actually run.
