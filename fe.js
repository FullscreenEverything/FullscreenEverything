document.addEventListener("mouseover", mouseOver);
document.addEventListener("mouseout", mouseOut);
document.addEventListener("click", click);

function mouseOver(event) {
    if (!document.fullscreenElement) {
        event.target.style.outline = "3px rgba(134,206,203, 0.8) solid";
    }
}

function mouseOut(event) {
    if (!document.fullscreenElement) {
        event.target.style.outline = "";
    }
}

function click(event) {
    openFullscreen(event.target);
    event.target.style.outline = "";
    // TODO: backgroundColor
    event.target.style.backgroundColor = 'white';
}

function openFullscreen(elem) {
    /* only fullscreen when not  */
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    }
}
