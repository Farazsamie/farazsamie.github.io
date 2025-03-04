import { data } from './research-data.js';

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close-btn");
const itemsContainer = document.querySelector("#items-container");

// Generate items dynamically
function createItems() {
    itemsContainer.innerHTML = data.map((item, index) => `
        <div class="item" data-index="${index}">
            <div class="item-name">${item.itemName}</div>
        </div>
    `).join('');
}

// Initialize items
createItems();

// GSAP animation timeline
const t1 = gsap.timeline({ paused: true, overwrite: "auto" });
t1.to(overlay, {
    duration: 1.5,
    bottom: "0px",
    rotation: 0,
    ease: "power3.inOut",
});

// Event listeners
document.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) {
        const index = item.dataset.index;
        updateOverlay(data[index]);
        t1.play();
    }
    
    if (e.target.matches('#close-btn')) {
        t1.reverse();
    }
});

function updateOverlay(dataItem) {
    document.querySelector("#item-title").textContent = dataItem.itemName;
    document.querySelector("#item-category").textContent = dataItem.itemCategory;
    document.querySelector("#item-link").href = dataItem.itemLink;
    document.querySelector("#item-copy").textContent = dataItem.itemCopy;
    document.querySelector("#item-img").src = dataItem.itemImg;
}