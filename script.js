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
        const items = Array.from(supportersList.querySelectorAll("li"));

        const readNumber = (value) => {
            const num = Number(value);
            return Number.isFinite(num) ? num : 0;
        };

        const readDate = (value) => {
            const ts = Date.parse(value || "");
            return Number.isFinite(ts) ? ts : 0;
        };

        items.forEach((item, index) => {
            item.dataset.manualIndex = String(index);
        });

        const sortItems = (mode) => {
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

                if (mode === "manual") {
                    return aManual - bManual;
                }

                if (mode === "latest") {
                    return bDate - aDate || bEstrogen - aEstrogen || bPrice - aPrice || aManual - bManual;
                }

                return bEstrogen - aEstrogen || bPrice - aPrice || bDate - aDate || aManual - bManual;
            });

            sorted.forEach((item) => {
                supportersList.appendChild(item);
            });
        };

        sortItems(supportersSort ? supportersSort.value : "top");

        if (supportersSort) {
            supportersSort.addEventListener("change", () => {
                sortItems(supportersSort.value);
            });
        }
    }
});
