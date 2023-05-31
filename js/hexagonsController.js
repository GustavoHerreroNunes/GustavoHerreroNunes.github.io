const hexagonsController = {
    initialized: false,

    initialize: () => {
        const skillDivs = {
            frontEnd: document.querySelector("#front-end"),
            backEnd: document.querySelector("#back-end"),
            design: document.querySelector("#design"),
        };
        const quoteDiv = document.querySelector("#quote"); 
        const hexRows = document.querySelectorAll(".hexrow");

        let mediaQuery = hexagonsController.setMediaQuery();
        hexagonsController.changeLayout(
            mediaQuery,
            skillDivs,
            quoteDiv,
            hexRows
        );
        mediaQuery.addEventListener("change", (event) => {
            hexagonsController.changeLayout(
                event.target,
                skillDivs,
                quoteDiv,
                hexRows
            );
        });
        hexagonsController.initialized = true;
    },
    setMediaQuery: () => {
        return window.matchMedia("(max-width: 766px)");
    },
    changeLayout: (media, skillDivs, quoteDiv, hexRows) => {
        console.log(`Breakpoint is ${!media.matches ? "NOT " : ""}small.`);
        console.log(skillDivs);
        if(media.matches){
            for (const skill in skillDivs) {
                skillDivs[skill].parentElement.removeChild(skillDivs[skill]);
            }
            quoteDiv.parentElement.removeChild(quoteDiv);
            hexRows[0].firstElementChild.after(skillDivs.frontEnd);
            hexRows[1].firstElementChild.after(skillDivs.backEnd);
            hexRows[2].firstElementChild.after(skillDivs.design);
        }
        else if(hexagonsController.initialized){
            let secondHex = hexRows[0].children[2];
            secondHex.after(skillDivs.frontEnd);

            const firstHex = hexRows[1].firstElementChild;
            firstHex.after(skillDivs.design, quoteDiv, skillDivs.backEnd)
        }
    }
}

window.addEventListener('load', hexagonsController.initialize);
