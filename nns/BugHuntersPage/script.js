const container = document.getElementById("bh-embed");

const updatetime = "2025-06-30T20:18:00+02:00"; // leave +02:00 for Warsaw timezone

const date = new Date(updatetime);
const formatter = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
});
const parts = formatter.formatToParts(date);
let day, month, year, hour, minute;
for (const part of parts) {
    if (part.type === "day") day = part.value;
    else if (part.type === "month") month = part.value;
    else if (part.type === "year") year = part.value;
    else if (part.type === "hour") hour = part.value;
    else if (part.type === "minute") minute = part.value;
}
const formattedDate = `${day}.${month}.${year} ${hour}:${minute}`;

// App Testers – always shown, excluded from stats
const fixedOrder = [
    "448894048586170369",
    "756482164262043720",
    "636210705632067586"
];
const specialHunters = bghunters.filter(b => fixedOrder.includes(b.id));

// Bug hunters counted in stats
const visibleHunters = bghunters
    .filter(b => b.id !== "0" && !fixedOrder.includes(b.id));

// Total bugs = only visibleHunters
const totalBugs = visibleHunters.reduce((sum, b) => sum + b.bugs, 0);

container.innerHTML = `
  <div class="author">
    <img src="https://cdn.discordapp.com/icons/643524342923264012/51e88caf85161b8c1222c17d181272e8.png" alt="icon">
    <a href="https://discord.nnamesquad.top/"><strong>NoName Squad 🙊</strong></a>
  </div>
  <div class="title">👾 BugHunters 👾</div>
  <div class="description">
    • Total: <strong>${totalBugs}</strong> errors found (App Tester reports not included).<br>
    <span style="color: #ff0000">⚠ If a user deletes or deactivates their account, their statistics will be removed, but their contributions will remain in the total bugs count. Personal statistics can be removed upon request; however, this action is irreversible.</span>
    <span style="color: #ff9900">⚠ Due to technical limitations, we cannot display usernames, only IDs. <b>BUT</b> you can click on the ID to check the user's profile via 3rd party service. This service is not affiliated with us or Discord in any way.</span>
  </div>
`;

// Render App Testers (no bug count)
if (specialHunters.length > 0) {
    let html = "";
    for (const id of fixedOrder) {
        const hunter = specialHunters.find(h => h.id === id);
        if (!hunter) continue;
        html += `<a href="https://discord.id/?prefill=${hunter.id}">@${hunter.id}</a><br>`;
    }
    container.innerHTML += `
    <div class="field">
      <h4><img src="https://sayouri.dev/nns/BugHuntersPage/media/AppTesterIcon.png" width="20px" height="20px" alt="[Icon: App Tester Badge]"> App Tester</h4>
      <p>${html}</p>
    </div>
  `;
}

// Badge groups
function groupByBadge(hunters, min, max, icon, alt, label, width = 18, height = 18) {
    const group = hunters.filter(h => h.bugs >= min && h.bugs < max);
    if (group.length === 0) return;
    let html = "";
    for (const h of group) {
        html += `<a href="https://discord.id/?prefill=${h.id}">@${h.id}</a> – <strong>${h.bugs}</strong> 👾<br>`;
    }
    container.innerHTML += `
    <div class="field">
      <h4><img src="${icon}" width="${width}" height="${height}" alt="${alt}"> ${label}</h4>
      <p>${html}</p>
    </div>
  `;
}

// Render badge levels
groupByBadge(
    visibleHunters,
    20,
    Infinity,
    "https://sayouri.dev/nns/BugHuntersPage/media/BugHunterL3.png",
    "[Icon: BugHunter Level 3 Badge]",
    "BugHunter Level 3",
);
groupByBadge(
    visibleHunters,
    5,
    20,
    "https://sayouri.dev/nns/BugHuntersPage/media/BugHunterL2.png",
    "[Icon: BugHunter Level 2 Badge]",
    "BugHunter Level 2",
);
groupByBadge(
    visibleHunters,
    1,
    5,
    "https://sayouri.dev/nns/BugHuntersPage/media/BugHunterL1.png",
    "[Icon: BugHunter Level 1 Badge]",
    "BugHunter Level 1",
    16,
    16
);

container.innerHTML += `
  <div class="footer">
    These statistics are conducted manually. The data may not be 100% accurate by manually moderating it, the data is only an analytical curiosity however we try to keep it as accurate as possible. Thank you for your understanding.
  </div>
  <div class="timestamp">${formattedDate}</div>
`;
