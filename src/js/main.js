import "../style.css";
import { grayscale  } from "./grayscale";

const img = new Image();
img.src = './image.jpg';

const img2 = new Image();
img2.src = './image.jpg'

const canvas = document.querySelector('.canvas');
const input = document.querySelector('.input1');
const value1 = document.querySelector('.value1');
const ctx = canvas.getContext('2d');

img.addEventListener('load', () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grayscale(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
    
    input.addEventListener('input', (event) => {
        value1.textContent = event.target.value;

        let copy = ctx.createImageData(scannedImage);
        scannedImage.data.forEach((element, index) => {
            copy.data[index] = scannedImage.data[index]; 
        });
        grayscale(copy.data, Number(event.target.value));
        ctx.putImageData(copy, 0, 0);
    })
})


