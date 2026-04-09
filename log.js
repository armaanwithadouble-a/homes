const pageArray = Object.entries(pages).map(([id, data]) => ({
    id: Number(id),
    ...data
}));

pageArray.sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff !== 0) return dateDiff;

    return b.id - a.id
});

const logDiv = document.getElementsByClassName('inner')[0];

pageArray.forEach(page => {
    const entry = document.createElement("div");

    if (page.id > 1) {
        entry.innerHTML = `
        <span class="logDate">${page.date} - </span><a class="log" href="index.html?page=${page.id}">
            "${pages[page.id - 1].cmd}"
        </a>
    `;
    } else {
        entry.innerHTML = `
        <span class="logDate">${page.date} - </span><a class="log" href="index.html?page=${page.id}">
            "HOMES"
        </a>
    `;
    }

    logDiv.appendChild(entry);
});

const spacer = document.createElement("div");
spacer.innerHTML += `<p style="padding-bottom:20px"></p>`
logDiv.appendChild(spacer);