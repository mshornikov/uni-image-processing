export const grayscale = (pixels) => {

    for (let i = 0; i < pixels.length; i += 4) {
        const redMultiplier = 0.3,
            greenMultiplier = 0.59,
            blueMultiplier = 0.11;

        const redValue = pixels[i],
            greenValue = pixels[i + 1],
            blueValue = pixels[i + 2];

        const gray = redMultiplier * redValue + greenMultiplier * greenValue + blueMultiplier * blueValue;

        [pixels[i], pixels[i + 1], pixels[i + 2]] = [gray, gray, gray];
    }
}   