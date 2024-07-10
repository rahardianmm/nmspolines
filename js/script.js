// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Hide overlays after a delay
setTimeout(() => {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}, 2000);

window.onload = () => {
    setTimeout(() => {
        const overlay = document.getElementById("overlay-home");
        if (overlay) {
            overlay.style.display = "none";
        }
    }, 2000);
};

// Function to navigate back
function goBack() {
    window.location.href = "index.html";
}

// Function to center the SVG in its container
function centerSVG() {
    const svgContainer = document.getElementById("svgContainer");
    const svgElement = svgContainer.querySelector("svg");

    if (!svgElement) return;

    const containerWidth = svgContainer.clientWidth;
    const containerHeight = svgContainer.clientHeight;
    const svgWidth = svgElement.getBBox().width;
    const svgHeight = svgElement.getBBox().height;

    svgContainer.scrollLeft = (svgWidth - containerWidth) / 2;
    svgContainer.scrollTop = (svgHeight - containerHeight) / 2;
}

// Function to handle zooming of the SVG
function zoomSVG(event) {
    event.preventDefault();
    const svgContainer = document.getElementById("svgContainer");
    const svgElement = svgContainer.querySelector("svg");
    let scale = parseFloat(svgElement.getAttribute("data-scale")) || 1;

    const zoomFactor = 0.1;
    if (event.deltaY < 0) {
        scale += zoomFactor;
    } else {
        scale -= zoomFactor;
    }

    scale = Math.max(0.1, Math.min(scale, 10)); // constrain the zoom level
    svgElement.setAttribute("data-scale", scale);
    svgElement.style.transform = `scale(${scale})`;
    svgElement.style.transformOrigin = "top left";

    // Adjust scrolling position to keep the view centered on zoom
    const containerWidth = svgContainer.clientWidth;
    const containerHeight = svgContainer.clientHeight;
    const svgWidth = svgElement.getBBox().width * scale;
    const svgHeight = svgElement.getBBox().height * scale;

    svgContainer.scrollLeft = (svgWidth - containerWidth) / 2;
    svgContainer.scrollTop = (svgHeight - containerHeight) / 2;
}

// Initialize centering and zooming
document.addEventListener("DOMContentLoaded", function () {
    centerSVG();
    const svgContainer = document.getElementById("svgContainer");
    svgContainer.addEventListener("wheel", zoomSVG);
});
window.addEventListener("resize", centerSVG);

// Function to create a back button
function createBackButton() {
    const backButton = document.createElement("a");
    backButton.className = "navbar-brand text-dark back-button";
    backButton.href = "#";
    backButton.onclick = () => goBack();
    backButton.style.color = "inherit";
    backButton.style.textDecoration = "none";
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';

    return backButton;
}

// Function to create a logout button
function createLogoutButton() {
    const logoutButton = document.createElement("a");
    logoutButton.className = "";
    logoutButton.onclick = () => goBack();
    logoutButton.style.color = "inherit";
    logoutButton.style.textDecoration = "none";
    logoutButton.innerHTML = '<button class="btn btn-primary">Logout</button>';

    return logoutButton;
}

// Append buttons to the container
document.getElementById("logoutButton").appendChild(createLogoutButton());
document.getElementById("backButtonContainer").appendChild(createBackButton());

// Map current page to active button
var pageButtonMap = {
    "/direktorat/direktorat-lt-1.html": "direktorat-lt1",
    "/direktorat/direktorat-lt-2.html": "direktorat-lt2",
    "/kerjasama/kerjasama-lt-1.html": "kerjasama-lt1",
    "/kerjasama/kerjasama-lt-2.html": "kerjasama-lt2",
    "/kerjasama/kerjasama-lt-3.html": "kerjasama-lt3",
};

var currentPath = window.location.pathname;
var activeButtonId = pageButtonMap[currentPath];
if (activeButtonId) {
    document.getElementById(activeButtonId).classList.add("active");
}
