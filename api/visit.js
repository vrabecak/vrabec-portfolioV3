export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  try {
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "?";
    const { browser, device } = req.body || {};

    let country = "?", city = "?", org = "?";
    try {
      const geo = await fetch(`https://ipapi.co/${ip}/json/`).then(r => r.json());
      country = geo.country_name || "?";
      city    = geo.city         || "?";
      org     = geo.org          || "?";
    } catch (_) {}

    await fetch(process.env.VISITOR_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "👤 Nová návštěva — potatogpu.lol",
          color: 0x7c3aed,
          fields: [
            { name: "🌍 Země",       value: country,          inline: true  },
            { name: "🏙️ Město",     value: city,             inline: true  },
            { name: "🌐 ISP",        value: org,              inline: false },
            { name: "📱 Zařízení",   value: device  || "?",   inline: true  },
            { name: "🖥️ Prohlížeč", value: browser || "?",   inline: true  },
            { name: "🕐 Čas",       value: new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" }), inline: false },
          ],
          footer: { text: `IP: ${ip}` }
        }]
      })
    });

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
