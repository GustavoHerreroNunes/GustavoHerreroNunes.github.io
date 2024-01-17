const hexagonsController = {
    initialized: false,

    initialize: () => {
        const skillDivs = [
            document.querySelector("#front-end"),
            document.querySelector("#back-end"),
            document.querySelector("#design"),
        ];
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

        if(media.matches){
            for(let index = 0; index < skillDivs.length; index++){
                hexRows[index].firstElementChild.after(skillDivs[index]);
            }
            quoteDiv.parentElement.removeChild(quoteDiv);
        }
        else if(hexagonsController.initialized){
            const thirdHexFirstRow = hexRows[0].children[2];
            thirdHexFirstRow.after(skillDivs[0]);

            const firstHexSecondRow = hexRows[1].firstElementChild;
            firstHexSecondRow.after(skillDivs[2], quoteDiv, skillDivs[1]);
        }
    }
}

window.addEventListener('load', hexagonsController.initialize);
