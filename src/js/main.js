import '../style.css';
import { grayscale } from './grayscale';
import { adjustBrightness } from './adjustBrightness';
import { histogram } from './histogram';
import { negative } from './negative';

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
    
    brightnessInput.addEventListener('input', (event) => {
        brightnessValue.textContent = event.target.value;
        
        ctx.drawImage(changedImg.src ? changedImg : originalImg, 0, 0, canvas.width, canvas.height);
        let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        adjustBrightness(scannedImage.data, Number(event.target.value));
        ctx.putImageData(scannedImage, 0, 0);
    })
});

document.querySelector('#original-button').addEventListener('click', () => {
    brightnessInput.value = 0;
    brightnessValue.textContent = 0;
    changedImg.src = originalImg.src;
    ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
});

document.querySelector('#grayscale-button').addEventListener('click', () => {
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    grayscale(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
    changedImg.src = canvas.toDataURL('image/jpeg');
})

document.querySelector('#negative-button').addEventListener('click', () => {
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    negative(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
    changedImg.src = canvas.toDataURL('image/jpeg');
})