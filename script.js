if (performance.navigation.type === 1) {
    window.location.href = "https://www.sayouri.dev/";
    style.setAttribute("href", "style.css");
}

var style = document.getElementById("stylesheet");
function showSection(section) {
    const sections = [
        { name: "aboutMe", block: "aboutMeBlock", button: "aboutMeButton" },
        { name: "projects", block: "projectsBlocks", button: "projectsButton" },
        { name: "contact", block: "contactBlock", button: "contactButton" },
    ];

    sections.forEach(s => {
        const block = document.getElementById(s.block);
        const button = document.getElementById(s.button);
        const img1 = document.getElementById("imgsubp");
        const img2 = document.getElementById("imgmainp");
        if (s.name === section) {
            block.style.display = "block";
            button.className = "btn-sellected";
            img1.style.display = "none"; img2.style.display = "block";
        } else {
            block.style.display = "none";
            button.className = "btn";
        }
    });
    style.setAttribute("href", "style2.css");
}
