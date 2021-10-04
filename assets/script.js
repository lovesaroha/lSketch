"use-strict";
/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

// Themes.
const themes = [
    {
        normal: "#5468e7",
        dark: "#4353b9",
        light: "#98a4f1",
        veryLight: "#eef0fd"
    }, {
        normal: "#e94c2b",
        dark: "#ba3d22",
        veryLight: "#fdedea",
        light: "#f29480"
    }
];
// Choose random color theme.
let colorTheme = themes[Math.floor(Math.random() * themes.length)];

// This function set random color theme.
function setTheme() {
    // Change css values.
    document.documentElement.style.setProperty("--primary", colorTheme.normal);
    document.documentElement.style.setProperty("--primary-light", colorTheme.light);
    document.documentElement.style.setProperty("--primary-dark", colorTheme.dark);
}

// Set random theme.
setTheme();

// Get canvas info from DOM.
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let x;
let y;
let ox;
let oy;
let lineWidth = 10;
let mouseDown = false;
let strokeStyle = colorTheme.normal;

// Canvas mouse events. 
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);

//  On mouse mouse down.
function onMouseDown(e) {
    mouseDown = true;
}

// On mouse up.
function onMouseUp(e) {
    mouseDown = false;
}

// On mouse move.
function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    if (mouseDown) {
        if (!ox || !oy) {
            ox = x;
            oy = y;
        }
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.moveTo(x, y);
        ctx.lineTo(ox, oy);
        ctx.stroke();
    }
    ox = x;
    oy = y;
}

window.addEventListener("mouseup", onMouseUp);

// This function clear canvas. 
function clearCanvas() {
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// This function shows config.
function showConfig() {
    showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-lg sm:w-full">
    <h4 class="text-subtitle">Brush Size</h4>
    <input type="range" class="range-slider" min="1" max="100" value="${lineWidth}" oninput="javascript: lineWidth=this.value;" id="myRange">
    <h4 class="text-subtitle">Color</h4>
    <input class="w-full mb-3" oninput="javascript: strokeStyle = this.value;" value="${strokeStyle}" placeholder="Color code..">
    <label class="bg-primary text-white p-2 px-4 cursor-pointer mb-3">
    Set Background Image <input class="hidden" oninput="javascript: setBackgroundImage(this);" type="file" name="image">
    </label>
    </div>`);
}

// This function set background image.
function setBackgroundImage(el) {
    let file = el.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        let image = new Image();
        image.src = reader.result;
        image.onload = function (e) {
            ctx.drawImage(image, 0, 0, 700, 600)
        }
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

// This function download image.
function downloadImage(el) {
    let imageData = canvas.toDataURL("image/png");
    var tmpLink = document.createElement('a');
    tmpLink.download = 'sketch.jpeg';
    tmpLink.href = imageData;
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}

// This is a showModal function which shows modal based on given options as an argument.  
function showModal(content) {
    let modal = document.getElementById("modal_id");
    if (modal == null) { return; }
    modal.style = "display: block;";
    modal.innerHTML = content;
}

// This is closeModal function which closes modal and remove backdrop from body.
function closeModal() {
    let modal = document.getElementById("modal_id");
    if (modal == null) { return; }
    modal.style = "display: none;";
    modal.innerHTML = ``;
}

// This is closeModal background function which closes modal.
function closeModalBackground(e) {
    if (e.target.id != "modal_id") { return; }
    let modal = document.getElementById("modal_id");
    if (modal == null) { return; }
    modal.style = "display: none;";
    modal.innerHTML = ``;
}
