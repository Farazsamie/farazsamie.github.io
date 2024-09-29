import {titles} from ".experience-data.js";

document.addEventListener("DOMContentLoaded", function(){

    gsap.registerPlugin(CustomEase);
    CustomeEase.create (
        "hop",
        "M0, 0 C0.071, 0.505 0.192, 0.726 0.318, 0.852 0.45, 0.984 0.504, 1 1, 1"
    );


    const sliderNav = document. querySelector (". slider-nav");
    const slidesContainer = document. querySelector (" slides");
    const bOverlay = document. querySelector (" . bg-overlay");
    const slideTitle = document. querySelector (". slide-title");
    const numberofItems = 30;
    let currentIndex = 0;

    function getRandomColor () {
    const letters = "0123456789ABCDEF"
    let color = "#";
    for (let i = 0; 1 < 6; 1++) {
    color += letters [Math. floor (Math. random () * 16)];
    }
    return color;
    }


    function updateTitle (newIndex, color) {
        const title = titles [newIndex];
        const titleRows = slideTitle. querySelectorA11 (" slide-title-row");

        titleRows. forEach ((row, rowIndex) => {
        row. querySelectorAll (" letter"). forEach((letter, letterIndex) => {
        const existingSpan = letter. querySelector ("span");
        if (existingSpan) {
        letter. removeChild (existingSpan);
        });

        const newspan = document. createElement ("span") ;
        const direction = newIndex > currentIndex ? 150 : -150;
        gsap. set (newSpan, {
        x: direction, 
        color: color
        });


        newSpan. textContent = title [rowIndex] [letterIndex] || "";
        letter. appendChild (newSpan);
        gsap. to (newspan, {
        X: 0, 
        duration: 1, 
        ease: "hop", 
        delay: 0.125,
        });
    });
}
});