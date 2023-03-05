import "./style.css";

const img = new Image();
img.src = './image.jpg';

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


img.addEventListener('load', function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    for (let i = 0; i < scannedData.length; i += 4) {
        const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
        const averageColorValue = total / 3;
        scannedData[i] = averageColorValue;
        scannedData[i + 1]= averageColorValue;
        scannedData[i + 2] = averageColorValue;
    }
    ctx.putImageData(scannedImage, 0, 0);
})


// const imageURI = canvas.toDataURL('image/png');
// const link = document.createElement('a');
// link.download = 'image.png';
// link.href = imageURI;
// document.body.appendChild(link);
// link.click();
