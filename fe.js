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
    // turn off selecting mode
    document.removeEventListener("mouseover", mouseOver);
    document.removeEventListener("mouseout", mouseOut);
    document.removeEventListener("click", click);

    /* only fullscreen when not  */
    if (!document.fullscreenElement) {
        event.target.requestFullscreen();
    }

    event.target.style.outline = "";
    // TODO: backgroundColor
    event.target.style.backgroundColor = 'white';
}
