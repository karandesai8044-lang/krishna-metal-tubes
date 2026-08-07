# Krishna Metal & Tubes — Website

Premium, bilingual (English + हिन्दी), mobile-first marketing website for **Krishna Metal & Tubes**, Raipur (C.G.) — importer, stockist & supplier of ferrous & non-ferrous metals, and manufacturer of stainless steel pipes.

**Live site:** https://karandesai8044-lang.github.io/krishna-metal-tubes/

---

## Pages

| Page | File | Contents |
|------|------|----------|
| Home | `index.html` | Hero, trust bar, stats, product categories, grades marquee, industries, facility gallery, why-us, CTA |
| Products | `products.html` | 10 detailed product categories, grades offered, technical data-sheet tables (chemical composition, pipe schedule, flange dimensions) |
| About | `about.html` | Company story, organization facts, capabilities, certifications, industries |
| Contact | `contact.html` | Contact cards, map card, WhatsApp-integrated enquiry form |

## Tech

- **Pure HTML + CSS + JavaScript** — zero build step, zero dependencies, hosts anywhere.
- Fonts: Google Fonts (Saira, Inter, IBM Plex Mono, Noto Sans Devanagari).
- Bilingual EN/हिं toggle (client-side, no reload), remembered via `localStorage`.
- Contact form is **backend-free**: it opens WhatsApp (or email) pre-filled with the enquiry.
- Effects: preloader, scroll reveals, count-up stats, grades marquee, image lightbox, magnetic buttons — all respect `prefers-reduced-motion`.

## Structure

```
.
├── index.html  products.html  about.html  contact.html
├── styles.css          # all styles
├── app.js              # all behaviour (shared across pages)
├── favicon.svg         # brand emblem (steel ring + red core)
├── robots.txt  sitemap.xml
└── images1/            # all 74 product & facility images
```

All asset paths are **relative**, so the site works from any folder or sub-path (including GitHub Pages project sites).

## Run locally

Any static server works. For example:

```bash
npx -y serve .
```

Then open the printed `http://localhost:PORT/` — `index.html` loads at the root.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. Site goes live at `https://<username>.github.io/<repo>/` within ~1 minute.

## TODO before public launch

- [ ] Replace the placeholder domain `https://karandesai8044-lang.github.io/krishna-metal-tubes` in the SEO tags (`canonical`, `og:*`, `twitter:*`), `sitemap.xml` and `robots.txt` with the real site URL (the GitHub Pages URL, or a custom domain if booked later).
- [ ] Confirm business hours (currently Mon–Sat, 10:00 AM – 8:00 PM).
- [ ] (Optional) Swap in real product photos; add Google Business Profile + Google Analytics.

## Contact

- **Phone:** +91 93000 02940 · +91 90987 25624
- **Email:** ktechsolutions.in@gmail.com
- **Address:** Shop No. A-04, Raipur Machinery Merchant Association Complex, Nr. Vayas Talab, Bhanpuri, Raipur (C.G.)
