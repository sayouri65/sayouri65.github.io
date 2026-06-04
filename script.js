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
        const startDateRaw = costNode.getAttribute("data-start-date");
        const startDate = startDateRaw ? new Date(startDateRaw) : null;
        const monthlyCostRaw = costNode.getAttribute("data-monthly-cost");
        const monthlyCost = monthlyCostRaw ? Number(monthlyCostRaw) : Number.NaN;
        const currency = costNode.getAttribute("data-currency") || "CZK";

        if (startDate && !Number.isNaN(startDate.getTime()) && Number.isFinite(monthlyCost) && monthlyCost >= 0) {
            const now = new Date();
            const msPerDay = 24 * 60 * 60 * 1000;
            const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            const daysElapsed = Math.max(0, Math.floor((nowUtc - startUtc) / msPerDay));

            const averageDaysPerMonth = 30.4375;
            const totalCost = (daysElapsed / averageDaysPerMonth) * monthlyCost;
            const roundedCost = currency === "CZK"
                ? Math.round(totalCost / 100) * 100
                : totalCost;
            const formattedCost = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                maximumFractionDigits: 0
            }).format(roundedCost);

            costNode.textContent = formattedCost;
        }
    }
});
