import data from '../data.json' with { type: 'json' };
import projectListItem from './components/projectListItem.js';

const dataController = {
    initialize: () => {
        const projectContainer = document.querySelector("#project-list");

        let listItems = [];

        data.projects.forEach((projectInfo, index) => {
            const {name, type, description, link, img} = projectInfo;
            listItems.push(projectListItem.getNewElement(
                index + 1, 
                name, 
                type, 
                description, 
                link, 
                img.src,
                img.alt
            ))
        })

        dataController.appendProjectListItems(projectContainer, listItems);
    },
    appendProjectListItems: (projectContainer, items) => {
        items.forEach(itemElement => {
            projectContainer.appendChild(itemElement);
        })
    }
}

if(document.readyState === 'loading')
    window.addEventListener('DOMContentLoaded', dataController.initialize);
else
    dataController.initialize();
