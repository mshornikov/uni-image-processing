export const grayscale = (pixels, brightness = 0) => {
    const redMultiplier = 0.3,
        greenMultiplier = 0.59,
        blueMultiplier = 0.11;

    for (let i = 0; i < pixels.length; i += 4) {

        const redValue = pixels[i],
            greenValue = pixels[i + 1],
            blueValue = pixels[i + 2];

        let gray = redMultiplier * redValue + greenMultiplier * greenValue + blueMultiplier * blueValue;
        gray += brightness;
        [pixels[i], pixels[i + 1], pixels[i + 2]] = [gray, gray, gray];
    }
}   