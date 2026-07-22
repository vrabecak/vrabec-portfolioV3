# vrabec — portfolio

Personal portfolio / bio page. Vanilla HTML, CSS and JavaScript — no framework.

Live status from Discord (Lanyard), now-playing from Last.fm, live weather, and a
public guestbook backed by Firebase.

## Structure

```
index.html        the whole site (markup, styles, scripts)
api/lastfm.js      serverless proxy that hides the Last.fm API key
favicon.ico
```

## Deploy (Vercel)

It's a static site with one serverless function, so no build step is needed.

Set these environment variables in the Vercel project (Settings → Environment Variables):

- `LASTFM_KEY` — your Last.fm API key
- `LASTFM_USER` — your Last.fm username (optional, defaults to `vrabecak`)

The Last.fm key lives only on the server, so it never appears in the browser.

## Local preview

Open `index.html` directly, or run a static server:

```
npx serve .
```

Note: the "now playing" card only works once deployed — the local static server
doesn't run the `/api/lastfm` function.
