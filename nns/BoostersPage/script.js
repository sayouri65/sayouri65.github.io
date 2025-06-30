const container = document.getElementById("boost-embed");

const updatetime = "2025-06-30T20:18:00+02:00"; // your timestamp string from file (leave +02:00 for Warsaw timezone)

const date = new Date(updatetime);
const formatter = new Intl.DateTimeFormat('pl-PL', {
  timeZone: 'Europe/Warsaw',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
const parts = formatter.formatToParts(date);
let day, month, year, hour, minute;
for (const part of parts) {
  if (part.type === 'day') day = part.value;
  else if (part.type === 'month') month = part.value;
  else if (part.type === 'year') year = part.value;
  else if (part.type === 'hour') hour = part.value;
  else if (part.type === 'minute') minute = part.value;
}
const formattedDate = `${day}.${month}.${year} ${hour}:${minute}`;

// Calculate total with ALL boosters (including id "0")
const totalBoosts = boosters.reduce((sum, b) => sum + b.boosts, 0);
const value = (totalBoosts * 4.99).toFixed(2);
const now = new Date().toISOString().split("T")[0];

// Filter out id "0" BEFORE sorting and rendering
const visibleBoosters = boosters.filter(b => b.id !== "0");

// Sort visible boosters descending by boosts
visibleBoosters.sort((a, b) => b.boosts - a.boosts);

container.innerHTML = `
  <div class="author">
    <img src="https://cdn.discordapp.com/icons/643524342923264012/51e88caf85161b8c1222c17d181272e8.png" alt="icon">
    <a href="https://discord.nnamesquad.top/"><strong>NoName Squad 🙊</strong></a>
  </div>
  <div class="title">🔮 History of boosters 🔮</div>
  <div class="description">
    • Total: <strong>${totalBoosts}</strong> 🚀<br>
    • Total value: <strong>${value} USD</strong> (4.99$/each)<br>
    ⚠ If a user deletes or deactivates their account, their statistics will be removed, but their contributions will remain in the total boost count. Personal statistics can be removed upon request; however, this action is irreversible.
  </div>
`;

// Render top 3 without id "0"
for (let i = 0; i < 3 && i < visibleBoosters.length; i++) {
  const medal = ["🥇", "🥈", "🥉"][i];
  const booster = visibleBoosters[i];
  container.innerHTML += `
    <div class="field">
      <h4>${medal} TOP ${i + 1}</h4>
      <p><a href="https://discord.id/?prefill=${booster.id}">@${booster.id}</a> - <strong>${booster.boosts}</strong> 🚀</p>
    </div>
  `;
}

// Render rest of leaderboard without id "0"
let rest = "";
for (let i = 3; i < visibleBoosters.length; i++) {
  const booster = visibleBoosters[i];
  rest += `${i + 1}. <a href="https://discord.id/?prefill=${booster.id}">@${booster.id}</a> - <strong>${booster.boosts}</strong> 🚀<br>`;
}

container.innerHTML += `
  <div class="field">
    <h4>🚀 Leaderboard</h4>
    <p>${rest}</p>
  </div>
  <div class="footer">
    We strive to keep these statistics accurate, but since they are updated manually, some errors may occur, which we work to minimize.
  </div>
 <div class="timestamp">${formattedDate}</div>
`;
