# coffeebarconnosseur.com — GITplay

Everything in this folder goes into your git repo root, as-is.

## Files

```
index.html                                  ← the full site (single file)
robots.txt                                  ← allows Google + AI crawlers (GPTBot, ClaudeBot, Google-Extended, Perplexity)
sitemap.xml                                 ← submit to Google Search Console
llms.txt                                    ← AI-assistant discovery file (Gemini/GPT/Claude)
articles/coffee-shop-music-curation.html    ← long-form SEO article #1
articles/backbeat-deceptive-promises.html   ← long-form SEO article #2
```

## Two files you must add yourself (referenced by index.html)

- `backbeat.mp4` — the center video loop
- `Cover.png` — the Backbeat book cover (falls back to the imgur image if missing)

## Deploy

```bash
git add .
git commit -m "New live site: RDV ident, random release spotlight, DJ set, SEO/AI files"
git push
```

## After deploy

1. Google Search Console → submit `sitemap.xml` and request indexing for all 3 pages.
2. Verify robots: https://coffeebarconnosseur.com/robots.txt and /llms.txt load.
3. Spelling check: this repo uses **coffeebarconnosseur.com** (as you wrote it) for all
   canonical URLs, but the email uses **coffeebarconnoisseur.com** (from the old site).
   If the real domain is spelled differently, find-and-replace across all files.

## How the live features work (no API keys)

- **Random release spotlight + DJ party set** use YouTube's auto-generated uploads
  playlist `UUu5m990d5telWfl5ihB28uA` for @ruedevivre — new releases appear
  automatically, and "Shuffle" jumps to a random one on every click/page load.
- **Netflix-style ident** cycles RUE DE VIVRE → RDV → STREET OF LIFE with a
  red-glow letter flicker.
- **Spotify note**: embeds only preview one track now (Spotify policy), so every
  playlist has an "OPEN FULL PLAYLIST" link that launches the real playlist.

© 2026 Decoded Music Playlist Curation
