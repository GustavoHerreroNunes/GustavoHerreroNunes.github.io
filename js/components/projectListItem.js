const projectListItem = {
    getNewElement: (positionNumber, name, type, descriptionItems, link, imgSrc, imgAlt) => {
        const stringElement =  `
            <li class="pb-5 scroll go-to-${positionNumber % 2 === 1 ? "left" : "right"}">
                <h3 class="project-name">${positionNumber}. ${name}</h3> 
                <div class="border border-black rounded p-1 d-inline project-tag">
                    <span class="visually-hidden">Tipo:</span> ${type}
                </div>
                <div class="row pt-lg-0 pt-3 flex-lg-row flex-column-reverse ">
                    <div class="col-xl-4 col-lg-5 col-12 ps-lg-5 ps-1">
                        
                        <ul class="project-description">
                            ${descriptionItems.map(item => `
                                <li>${item}</li>    
                            `).join("")}
                        </ul>

                        <p><a class="project-link" href=${link}>Acesse o projeto</a></p>
                    </div>
                    <div class="col">
                        <img src=${imgSrc} class="d-block w-100" alt="${imgAlt}">
                    </div>
                </div>
            </li>
        `;

        return new DOMParser().parseFromString(stringElement, 'text/html').body.firstElementChild;
    }
}

export default projectListItem;
