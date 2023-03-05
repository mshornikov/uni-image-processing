import "../style.css";
import { grayscale  } from "./grayscale";

const img = new Image();
img.src = './image.jpg';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

img.addEventListener('load', function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grayscale(scannedImage.data);
    ctx.putImageData(scannedImage, 0, 0);
})

// const imageURI = canvas.toDataURL('image/png');
// const link = document.createElement('a');
// link.download = 'image.png';
// link.href = imageURI;
// document.body.appendChild(link);
// link.click();
