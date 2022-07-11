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
    event.target.style.backgroundColor = getBGC(event.target);
}

// TODO: calc alpha
function getBGC(elem) {
    while (elem) {
        let cv = colorValues(window.getComputedStyle(elem).backgroundColor);
        if (cv[3]==1)
            return "rgb("+cv[0]+","+cv[1]+","+cv[2]+")";
        else
            elem = elem.parentElement;
    }
    return "white";
}

// https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
function colorValues(color)
{
    if (!color)
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}
