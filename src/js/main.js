import '../style.css';
import { grayscale } from './grayscale';
import { adjustBrightness } from './adjustBrightness';
import { histogram } from './histogram';
import { negative } from './negative';
import { binarization } from './binarization';

const originalImg = new Image();
originalImg.src = '/public/moscow.jpeg';

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
})