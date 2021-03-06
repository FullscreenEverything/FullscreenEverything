var bak_target;
var bak_backgroundColor;
if (registered == undefined) {
    var registered = false;
}
if (selecting == undefined) {
    var selecting = true;
}

if (!registered) {
    document.addEventListener("mouseover", mouseOver);
    document.addEventListener("mouseout", mouseOut);
    document.addEventListener("click", click);
    document.addEventListener("fullscreenchange", fschange);
    document.addEventListener("keydown", keydown);
    registered = true;
}

selecting = true;

function mouseOver(event) {
    if (selecting) {
        bak_target = event.target;
        bak_target.classList.add("FullscreenEverything_Hover");
    }
}

function mouseOut(event) {
    if (selecting) {
        event.target.classList.remove("FullscreenEverything_Hover");
    }
}

function click(event) {
    /* only fullscreen when not  */
    if (selecting && !document.fullscreenElement) {
        selecting = false;
        event.target.requestFullscreen();
        event.target.classList.remove("FullscreenEverything_Hover");
        // save style
        bak_target = event.target;
        bak_backgroundColor = event.target.style.backgroundColor;
        // set style
        event.target.style.backgroundColor = getBGC(event.target);
        event.target.classList.add("FullscreenEverything_Fullscreen");
    }
}

function fschange() {
    // if exit fullscreen
    if (!document.fullscreenElement) {
        // restore style
        bak_target.style.backgroundColor = bak_backgroundColor;
        bak_target.classList.remove("FullscreenEverything_Fullscreen");
    }
}

function keydown(event) {
    if (event.key == "Escape" && selecting) {
        selecting = false;
        bak_target.classList.remove("FullscreenEverything_Hover");
    }
}

function getBGC(elem) {
    let res = [0, 0, 0];
    let alpha = 1;
    while (elem) {
        let cv = colorValues(window.getComputedStyle(elem).backgroundColor);
        res[0] += cv[0] * cv[3] * alpha;
        res[1] += cv[1] * cv[3] * alpha;
        res[2] += cv[2] * cv[3] * alpha;
        alpha *= 1 - cv[3];
        if (cv[3]==1)
            break;
        else
            elem = elem.parentElement;
    }
    // overlay color with white
    res[0] += 255 * alpha;
    res[1] += 255 * alpha;
    res[2] += 255 * alpha;
    return "rgba("+res[0]+","+res[1]+","+res[2]+")";
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

