export default async function handler(req, res) {
  const KEY = process.env.LASTFM_KEY;
  const USER = process.env.LASTFM_USER || "vrabecak";

  if (!KEY) {
    res.status(500).json({ error: "LASTFM_KEY not configured" });
    return;
  }

  try {
    const url =
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
      "&user=" + encodeURIComponent(USER) +
      "&api_key=" + KEY +
      "&format=json&limit=1";
    const r = await fetch(url);
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=40");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: "last.fm request failed" });
  }
}
