import { titles } from "./experience-data.js";

document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugin
    gsap.registerPlugin(CustomEase);
    
    // Create a custom easing function for animations
    CustomEase.create(
        "hop",
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );

    // DOM Elements
    const sliderNav = document.querySelector(".slider-nav");
    const slidesContainer = document.querySelector(".slides");
    const bgOverlay = document.querySelector(".bg-overlay");
    const slideTitle = document.querySelector(".slide-title");

     // Dynamically set the number of items based on the titles array length
     const numberOfItems = titles.length;
     let currentIndex = 0;
 
     // Configurations for animation (centralize these so they're easy to adjust)
     const ANIMATION_DURATION = 1.5;
     const LETTER_STAGGER_DELAY = 0.125;
 
     // Helper function to generate random hex color
     function getRandomColor() {
         const letters = "0123456789ABCDEF";
         return `#${Array.from({ length: 6 })
             .map(() => letters[Math.floor(Math.random() * 16)])
             .join('')}`;
     }
 
     // Function to update the title letters on each slide
     function updateTitle(newIndex, color) {
         const title = titles[newIndex];
         const titleRows = slideTitle.querySelectorAll(".slide-title-row");
 
         // Iterate through title rows and letters
         titleRows.forEach((row, rowIndex) => {
             row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
                 const existingSpan = letter.querySelector("span");
                 if (existingSpan) {
                     letter.removeChild(existingSpan); // Remove old letter
                 }
 
                 const newSpan = document.createElement("span");
                 const direction = newIndex > currentIndex ? 150 : -150; // Slide direction
 
                 gsap.set(newSpan, {
                     x: direction,  // Set starting position
                     color: color   // Apply new color
                 });
 
                 // Add new letter or empty space if no letter in the title
                 newSpan.textContent = title[rowIndex]?.[letterIndex] || "";
                 letter.appendChild(newSpan);
 
                 // Animate the letters sliding in
                 gsap.to(newSpan, {
                     x: 0,
                     duration: 1,
                     ease: "hop",
                     delay: LETTER_STAGGER_DELAY
                 });
             });
         });
     }
 
     // Function to create navigation items and slides dynamically
     function createSlidesAndNav() {
         titles.forEach((_, i) => {
             // Create nav item
             const navItemWrapper = document.createElement("div");
             navItemWrapper.classList.add("nav-item-wrapper");
             if (i === 0) navItemWrapper.classList.add("active");  // Set first item as active
 
             const navItem = document.createElement("div");
             navItem.classList.add("nav-item");
 
             navItemWrapper.appendChild(navItem);
             sliderNav.appendChild(navItemWrapper);
 
             // Add click event to each nav item
             navItemWrapper.addEventListener("click", () => handleNavClick(i));
 
             // Create slide
             const slide = document.createElement("div");
             slide.classList.add("slide");
             if (i === 0) slide.classList.add("active");  // Set first slide as active
 
             const imgWrapper = document.createElement("div");
             imgWrapper.classList.add("img");
 
             // Create and append image
             const img = document.createElement("img");
             img.src = `./assets/img${i + 1}.jpg`; // Dynamic image path
             img.alt = `Slide Image ${i + 1}`;
 
             imgWrapper.appendChild(img);
             slide.appendChild(imgWrapper);
             slidesContainer.appendChild(slide);
         });
     }
 
     // Handle navigation clicks
     function handleNavClick(index) {
         if (index === currentIndex) return; // Do nothing if same slide clicked
 
         // Update active nav item
         document.querySelectorAll(".nav-item-wrapper").forEach((nav) => nav.classList.remove("active"));
         document.querySelectorAll(".nav-item-wrapper")[index].classList.add("active");
 
         // Slide transition animation
         const translateXValue = -index * 100; // Calculate new slide position
         gsap.to(slidesContainer, {
             x: `${translateXValue}vw`,
             duration: ANIMATION_DURATION,
             ease: "hop"
         });
 
         // Update background overlay color
         const newColor = getRandomColor();
         gsap.to(bgOverlay, {
             backgroundColor: newColor,
             duration: ANIMATION_DURATION,
             ease: "hop"
         });
 
         // Update the slide title and set the current index
         updateTitle(index, newColor);
         currentIndex = index;
     }
 
     // Initialize: create slides and nav items, and set the initial title
     createSlidesAndNav();
     updateTitle(0, getComputedStyle(bgOverlay).backgroundColor);
 });