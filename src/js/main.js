import '../style.css';
import { grayscale } from './grayscale';
import { adjustBrightness } from './adjustBrightness';
import { histogram } from './histogram';
import { negative } from './negative';
import { binarization } from './binarization';
import { contrastInc, contrastDec } from './contrast';
import { gamma } from './gamma';
import { coloring } from './coloring';
import { quantization  } from './quantization';
import { solarization } from './solarization';

const originalImg = new Image();
originalImg.src = '/public/image.jpg';

const changedImg = new Image();

const canvas = document.querySelector('.image');
const brightnessInput = document.querySelector('.brightness-input');
const brightnessValue = document.querySelector('.brightness-value');

const ctx = canvas.getContext('2d', {willReadFrequently: true});

originalImg.addEventListener('load', () => {
    canvas.width = originalImg.width;
    canvas.height = originalImg.height;
    ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    histogram(scannedImage.data);

    brightnessInput.addEventListener('input', (event) => {
        brightnessValue.textContent = event.target.value;
        
        ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
        let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        adjustBrightness(scannedImage.data, Number(event.target.value));
        ctx.putImageData(scannedImage, 0, 0);
        scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        histogram(scannedImage.data);
    })
});

document.querySelector('#original-button').addEventListener('click', () => {
    brightnessInput.value = 0;
    brightnessValue.textContent = 0;
    negativeInput.value = 0;
    negativeValue.textContent = 0;
    binarizationInput.value = 0;
    binarizationValue.textContent = 0;
    changedImg.src = originalImg.src;
    
    ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    histogram(scannedImage.data);
});

document.querySelector('#grayscale-button').addEventListener('click', () => {
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    grayscale(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);

    changedImg.src = canvas.toDataURL('image/jpeg');
})

document.querySelector('#negative-button').addEventListener('click', () => {
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    negative(scannedImage.data, 0);
    ctx.putImageData(scannedImage, 0, 0);
    scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    histogram(scannedImage.data);
    changedImg.src = canvas.toDataURL('image/jpeg');
})

const negativeInput = document.querySelector('.negative-input');
const negativeValue = document.querySelector('.negative-value');
negativeInput.addEventListener('input', (e) => {
    negativeValue.textContent = e.target.value;
    ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    negative(scannedImage.data, Number(e.target.value));

    histogram(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
})

const binarizationInput = document.querySelector('.binarization-input');
const binarizationValue = document.querySelector('.binarization-value');
binarizationInput.addEventListener('input', (e) => {
    binarizationValue.textContent = e.target.value;
    ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    binarization(scannedImage.data, Number(e.target.value));
    histogram(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
});

//Увеличение контраста
const contrastUpQ1Value = document.querySelector('.contrast-up-q1-value');
const contrastUpQ2Value = document.querySelector('.contrast-up-q2-value');
const contrastUpQ1Input = document.querySelector('.contrast-up-q1-input');
const contrastUpQ2Input = document.querySelector('.contrast-up-q2-input');
const contrastUpButton = document.querySelector('#contrast-up-button');

let upQ1 = 0;
let upQ2 = 0;

contrastUpQ1Input.addEventListener('input', (e) => {
    contrastUpQ1Value.textContent = e.target.value;
    upQ1 = Number(e.target.value);
})

contrastUpQ2Input.addEventListener('input', (e) => {
    contrastUpQ2Value.textContent = e.target.value;
    upQ2 = Number(e.target.value);
})

contrastUpButton.addEventListener('click', () => {    
    ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    contrastInc(scannedImage.data, upQ1, upQ2);
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);

    changedImg.src = canvas.toDataURL('image/jpeg');
})

//Уменьшение контраста
const contrastDownQ1Value = document.querySelector('.contrast-down-q1-value');
const contrastDownQ2Value = document.querySelector('.contrast-down-q2-value');
const contrastDownQ1Input = document.querySelector('.contrast-down-q1-input');
const contrastDownQ2Input = document.querySelector('.contrast-down-q2-input');
const contrastDownButton = document.querySelector('#contrast-down-button');

let downQ1 = 0;
let downQ2 = 0;

contrastDownQ1Input.addEventListener('input', (e) => {
    contrastDownQ1Value.textContent = e.target.value;
    downQ1 = Number(e.target.value);
})

contrastDownQ2Input.addEventListener('input', (e) => {
    contrastDownQ2Value.textContent = e.target.value;
    downQ2 = Number(e.target.value);
})

contrastDownButton.addEventListener('click', () => {
    ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    contrastDec(scannedImage.data, downQ1, downQ2);
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);

    changedImg.src = canvas.toDataURL('image/jpeg');
})

const gammaValue = document.querySelector('.gamma-value');
const gammaInput = document.querySelector('.gamma-input');

gammaInput.addEventListener('input', (e) => {
    gammaValue.textContent = e.target.value;

    ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    gamma(scannedImage.data, Number(e.target.value));
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);
})

const coloringButton = document.querySelector('#coloring-button');
coloringButton.addEventListener('click', (e) => {
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    coloring(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);

    changedImg.src = canvas.toDataURL('image/jpeg');
})

const quantizationInput = document.querySelector('.quantization-input');
const quantizationValue = document.querySelector('.quantization-value');

quantizationInput.addEventListener('input', (e) => {
    quantizationValue.textContent = e.target.value;

    ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    quantization(scannedImage.data, Number(e.target.value));
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);
})

const solarizationButton = document.querySelector('#solarization-button');
solarizationButton.addEventListener('click', () => {
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    solarization(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
    histogram(scannedImage.data);
})