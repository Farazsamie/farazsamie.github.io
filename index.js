const trails = document.querySelectorAll(".trail");
const smoothPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const totalPointsArray = [40, 35, 30, 25, 20, 15, 10];

window.addEventListener("mousemove", (event) => {
    smoothPointer.x = event.clientX;
    smoothPointer.y = event.clientY;
});

function updatePath() {
    trails.forEach((path, index) => {
        if (!path.points) path.points = [];
        path.points.unshift({ ...smoothPointer });

        if (path.points.length > totalPointsArray[index]) {
            path.points.pop();
        }

        let d = `M ${path.points[0].x} ${path.points[0].y}`;
        for (let i = 1; i < path.points.length; i++) {
            d += ` L ${path.points[i].x} ${path.points[i].y}`;
        }

        path.setAttribute("d", d);
    });

    requestAnimationFrame(updatePath);
}

updatePath();
