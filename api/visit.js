export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://potatogpu.lol");
  if (req.method !== "POST") return res.status(405).end();

  const { country, city, org, browser, device } = req.body;
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "?";

  await fetch(process.env.VISITOR_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "👤 Nová návštěva — potatogpu.lol",
        color: 0x7c3aed,
        fields: [
          { name: "🌍 Země",     value: country || "?", inline: true },
          { name: "🏙️ Město",   value: city    || "?", inline: true },
          { name: "🌐 ISP",      value: org     || "?", inline: false },
          { name: "📱 Zařízení", value: device  || "?", inline: true },
          { name: "🖥️ Prohlížeč", value: browser || "?", inline: true },
          { name: "🕐 Čas",     value: new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" }), inline: false },
        ],
        footer: { text: "potatogpu.lol analytics" }
      }]
    })
  });

  res.status(200).end();
}
