'use strict'

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 60;
canvas.height = 600;

const context = canvas.getContext('2d');
const startBackgroundColor = 'white';
context.fillStyle = startBackgroundColor;
context.fillRect(0, 0, canvas.width, canvas.height);

let drawColor = 'black';
let drawWidth = '2';
let isDrawing = false;

let fillable = false;
let figure = 'line';
let x1, y1;
let allArray = [];
let index = -1;

context.fillStyle = drawColor;

canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stop, false);

function start(event) {
    isDrawing = true;
    context.beginPath();
    if (figure === 'line') context.moveTo(event.clientX - canvas.offsetLeft, 
                   event.clientY - canvas.offsetTop);

    if (figure === 'dot') {
        context.strokeStyle = drawColor;
        context.lineWidth = drawWidth;
        context.arc(event.clientX - canvas.offsetLeft, 
                    event.clientY - canvas.offsetTop, 
                    drawWidth, 0, Math.PI*2);
        context.fill();
    }

    if (figure === 'square' || figure === 'circle') {
        context.strokeStyle = drawColor;
        context.lineWidth = drawWidth;
        x1 = event.clientX - canvas.offsetLeft;
        y1 = event.clientY - canvas.offsetTop;
    }

    event.preventDefault();
};

function draw(event) {
    if (isDrawing) {
        if (figure === 'line') {
            context.lineTo(event.clientX - canvas.offsetLeft, 
                           event.clientY - canvas.offsetTop);
            context.strokeStyle = drawColor;
            context.lineWidth = drawWidth;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();
        };
    };
    event.preventDefault();
};

function stop(event) {
    if (figure === 'square' && fillable === false) {
        context.strokeRect(x1, y1, event.clientX - canvas.offsetLeft - x1, 
                           event.clientY - canvas.offsetTop - y1);
    } else if (figure === 'square' && fillable === true) {
        context.fillRect(x1, y1, event.clientX - canvas.offsetLeft - x1, 
            event.clientY - canvas.offsetTop - y1);
    };

    if (figure === 'circle') {
        let x2 = event.clientX - canvas.offsetLeft;
        let y2 = event.clientY - canvas.offsetTop;
        let radius = Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
        context.arc(x1, y1, radius, 0, Math.PI*2);
    }

    if (isDrawing) {
        if (figure !== 'dot' && fillable === false) context.stroke();
        if (figure !== 'line' && fillable === true) context.fill();
        context.closePath();
        isDrawing = false;
    }
    event.preventDefault();

    if ( event.type !== 'mouseout') {
        allArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index++;
    };
};

function changeColor(element) {
    drawColor = element.style.background;
    context.fillStyle = drawColor;
};

function clearCanvas() {
    context.fillStyle = startBackgroundColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    allArray = [];
    index = -1;
};

function undoLast() {
    if (index <= 0) {
        clearCanvas();
    } else {
        index--;
        allArray.pop(index);
        context.putImageData(allArray[index], 0, 0);
    }
};

function setFigure(element) {
    figure = element.id;
};

function changeFillable(element) {
    if (fillable) {
        fillable = false;
        element.style.background = '#222';
        element.style.color = 'white';
    } else {
        fillable = true;
        element.style.background = 'white';
        element.style.color = 'black';
    };
};