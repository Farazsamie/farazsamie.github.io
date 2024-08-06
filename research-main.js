import { data } from "./research-data.js";

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close-btn");

const t1 = gsap.timeline({ paused: true, overwrite: "auto" });

t1.to(overlay, {
    duration: 0.5,
    bottom: "0px",
    rotation: 0,
    transformOrigin: "bottom center",
    ease: "power3.inOut",
});

const items = document.querySelectorAll(".item");
items.forEach((item, index) => {
    item.addEventListener("click", () => {
        updateOverlay(data[index]);
        t1.play();
    });
});

closeBtn.addEventListener("click", () => {
    t1.reverse();
});

function updateOverlay(dataItem) {
    const itemName = document.querySelector("#item-category").previousElementSibling;
    const itemCategory = document.querySelector("#item-category");
    const itemLink = document.querySelector("#item-link");
    const itemCopy = document.querySelector("#item-copy");
    const itemImg = document.querySelector("#item-img");

    itemName.textContent = dataItem.itemName;
    itemCategory.textContent = dataItem.itemCategory;
    itemLink.href = dataItem.itemLink;
    itemCopy.textContent = dataItem.itemCopy;
    itemImg.src = dataItem.itemImg;
}

document.addEventListener("click", (e) => {
    if (!overlay.contains(e.target) && !isItem(e.target)) {
        t1.reverse();
    }
});

function isItem(target) {
    return target.closest(".item");
}
