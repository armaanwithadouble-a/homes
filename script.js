function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadContent() {
    const pageId = getQueryParam('page');
    const contentContainer = document.getElementsByClassName('inner')[0];

    if (!pageId) {
        window.location.search = '?page=1';
        return;
    }

    if (pageId && pages[pageId]) {
        const page = pages[pageId];

        let contentHTML = ``;

        const currPageNum = parseInt(pageId);

        if (currPageNum > 1) {
            contentHTML += `<h1 class="title">${pages[currPageNum-1].cmd}</h1>`
        } else {
            contentHTML += `<img src="generalAssets/logo.png" style="width: 100%;padding-top: 0px;">`
        }

        page.img.forEach(imgSrc => {
            // contentHTML += `<img class="img" src="${imgSrc}" alt="awesome image" />`;

            if (imgSrc.endsWith(".html")) {
                contentHTML += `
                    <div class="embed">
                        <iframe src="${imgSrc}"></iframe>
                    </div>
                `;
            } else if (imgSrc.endsWith(".mp4")) {
                contentHTML += `
                    <video class="img" controls>
                        <source src="${imgSrc}" type="video/mp4">
                        browser doesn't support videos :(
                    </video>
                `;
            } else {
                contentHTML += `<img class="img" src="${imgSrc}" alt="awesome image" />`;
            }
        });

        let textContent = page.text.replace(/\n/g, "<br>");

        contentHTML += `<p class="txt">${textContent}</p>`

        if (page.chat) {
            contentHTML += `
                <div class="chat">
                    <button class="chatToggle">Show Log</button>
                    <div class="chatContent" style="display: none;">
            `;

            page.chat.forEach(line => {
                contentHTML += `
                    <div class="chatLine" style="color: ${line.color}">
                        <span class="chatSpeaker">${line.speaker}:</span> ${line.text}
                    </div>
                `;
            });

            contentHTML += `
                    </div>
                </div>
            `;
        }

        if (pages[currPageNum+1]) {
            contentHTML += `<div><span class="cmdSymbol">> </span><a class="cmd" href="?page=${currPageNum+1}">${page.cmd}</a></div>`
        }

        if (pages[currPageNum-1]) {
            contentHTML += `<a class="goBack" href="?page=${currPageNum-1}">Go Back</a>`
        } else {
            contentHTML += `<a class="goBack"></a>`
        }

        contentContainer.innerHTML = contentHTML
    } else {
        let contentHTML = ``;

        contentHTML += `<h1 class="title">error 404</h1>`;

        contentHTML += `<img class="img" src="generalAssets/404.png" alt="image" />`;

        contentHTML += `<p class="txt">lowkey i Don't think you're Supposed to be here idk Tho</p>`;

        contentHTML += `<div><span class="cmdSymbol">> </span><a class="cmd" href="index.html?page=1">TAKE ME BACK!!!</a></div>`;

        contentHTML += `<a class="goBack"></a>`

        contentContainer.innerHTML = contentHTML
    }

    setTimeout(() => {
        const toggle = document.querySelector('.chatToggle');
        const chatContent = document.querySelector('.chatContent');

        if (toggle && chatContent) {
            toggle.onclick = () => {
                const isHidden = chatContent.style.display === "none";
                chatContent.style.display = isHidden ? "block" : "none";
                toggle.textContent = isHidden? "Hide Log" : "Show Log";
            };
        }
    }, 0);

}

window.onload = loadContent;