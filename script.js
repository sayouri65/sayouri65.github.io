document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    const ageNode = document.getElementById("age");
    if (ageNode) {
        const birthdate = ageNode.getAttribute("data-birthdate");
        const parsed = birthdate ? new Date(birthdate) : null;

        if (parsed && !Number.isNaN(parsed.getTime())) {
            const now = new Date();
            let age = now.getFullYear() - parsed.getFullYear();
            const birthdayPassed =
                now.getMonth() > parsed.getMonth() ||
                (now.getMonth() === parsed.getMonth() && now.getDate() >= parsed.getDate());

            if (!birthdayPassed) {
                age -= 1;
            }

            ageNode.textContent = String(age);
        }
    }

    const durationNode = document.getElementById("hrt-duration");
    if (durationNode) {
        const startDateRaw = durationNode.getAttribute("data-start-date");
        const startDate = startDateRaw ? new Date(startDateRaw) : null;

        if (startDate && !Number.isNaN(startDate.getTime())) {
            const now = new Date();
            const msPerDay = 24 * 60 * 60 * 1000;
            const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            const daysElapsed = Math.max(0, Math.floor((nowUtc - startUtc) / msPerDay));

            durationNode.textContent = `${daysElapsed} day${daysElapsed === 1 ? "" : "s"}`;
        }
    }

    const costNode = document.getElementById("hrt-cost");
    if (costNode) {
        const totalCostRaw = costNode.getAttribute("data-allcost");
        const totalCost = totalCostRaw ? Number(totalCostRaw) : Number.NaN;
        const currency = costNode.getAttribute("data-currency") || "CZK";

        if (Number.isFinite(totalCost) && totalCost >= 0) {
            const roundedCost = currency === "CZK"
                ? Math.round(totalCost / 10) * 10
                : totalCost;
            const formattedCost = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                maximumFractionDigits: 0
            }).format(roundedCost);

            costNode.textContent = formattedCost;
        }
    }

    const supportersList = document.querySelector(".supporters-list");
    if (supportersList) {
        const supportersSort = document.getElementById("supporters-sort");

        const readNumber = (value) => {
            const num = Number(value);
            return Number.isFinite(num) ? num : 0;
        };

        const readDate = (value) => {
            const ts = Date.parse(value || "");
            return Number.isFinite(ts) ? ts : 0;
        };

        const formatDate = (dateStr) => {
            const d = new Date(dateStr + "T00:00:00");
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        };

        const buildItem = (supporter, index) => {
            const li = document.createElement("li");
            li.dataset.estrogen = String(supporter.estrogen);
            li.dataset.priceCzk = String(supporter.priceCzk);
            li.dataset.date = supporter.date;
            li.dataset.manualIndex = String(index);

            const strong = document.createElement("strong");
            strong.textContent = supporter.name;

            const img = document.createElement("img");
            img.className = "support-icon";
            img.src = "media/estradiol.png";
            img.alt = "estradiol";

            li.appendChild(strong);
            li.append(`: ${supporter.estrogen}x `);
            li.appendChild(img);
            li.append(` worth ${supporter.priceCzk} CZK on ${formatDate(supporter.date)}`);

            return li;
        };

        const sortItems = (items, mode) => {
            const sorted = [...items];

            sorted.sort((a, b) => {
                const aEstrogen = readNumber(a.dataset.estrogen);
                const bEstrogen = readNumber(b.dataset.estrogen);
                const aPrice = readNumber(a.dataset.priceCzk);
                const bPrice = readNumber(b.dataset.priceCzk);
                const aDate = readDate(a.dataset.date);
                const bDate = readDate(b.dataset.date);
                const aManual = readNumber(a.dataset.manualIndex);
                const bManual = readNumber(b.dataset.manualIndex);

                if (mode === "latest") {
                    return bDate - aDate || bEstrogen - aEstrogen || bPrice - aPrice || aManual - bManual;
                }

                return bEstrogen - aEstrogen || bPrice - aPrice || bDate - aDate || aManual - bManual;
            });

            supportersList.replaceChildren(...sorted);
        };

        const showSupportersMessage = (message) => {
            const li = document.createElement("li");
            li.textContent = message;
            supportersList.replaceChildren(li);
        };

        const isValidSupporter = (supporter) => {
            if (!supporter || typeof supporter !== "object") {
                return false;
            }

            const hasName = typeof supporter.name === "string" && supporter.name.trim().length > 0;
            const hasEstrogen = Number.isFinite(Number(supporter.estrogen));
            const hasPrice = Number.isFinite(Number(supporter.priceCzk));
            const hasDate = typeof supporter.date === "string" && Number.isFinite(Date.parse(supporter.date));

            return hasName && hasEstrogen && hasPrice && hasDate;
        };

        const fetchSupporters = async () => {
            const candidates = [
                new URL("supporters.json", document.baseURI).href,
                `${window.location.origin}/supporters.json`,
                "https://sayouri.dev/supporters.json",
                "https://sayouri65.github.io/supporters.json"
            ];

            let lastError = null;
            for (const url of candidates) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Request failed with ${response.status}`);
                    }

                    const payload = await response.json();
                    if (!Array.isArray(payload)) {
                        throw new Error("Supporters payload is not an array");
                    }

                    return payload.filter(isValidSupporter);
                } catch (error) {
                    lastError = error;
                }
            }

            throw lastError || new Error("Unable to load supporters");
        };

        fetchSupporters()
            .then((data) => {
                if (!data.length) {
                    showSupportersMessage("No supporters yet.");
                    return;
                }

                const items = data.map((s, i) => buildItem(s, i));
                sortItems(items, supportersSort ? supportersSort.value : "top");

                if (supportersSort) {
                    supportersSort.addEventListener("change", () => {
                        const current = Array.from(supportersList.querySelectorAll("li"));
                        sortItems(current, supportersSort.value);
                    });
                }
            })
            .catch(() => {
                showSupportersMessage("Supporters could not be loaded right now.");
            });
    }
});
