const scrollAnimationController = {
    initialize: () =>{
        const scrollElements = document.querySelectorAll(".scroll");

        scrollAnimationController.animateElements(scrollElements);
        window.addEventListener("scroll", () => {
            scrollAnimationController.animateElements(scrollElements);
        });
    },

    animateElements: (elements) => {
        const windowHeight = window.innerHeight;
        const showElementOn = windowHeight/4 * 3;
        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if(elementTop <= showElementOn){
                element.classList.add("active");
            }else{
                element.classList.remove("active");
            }
        });
    }
}

window.addEventListener("load", scrollAnimationController.initialize);