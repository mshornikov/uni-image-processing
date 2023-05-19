export const quantization = (pixels, amountOfSegments) => {
	const step = 256 / amountOfSegments;
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] = (Math.floor(pixels[i] / step) * step);
		pixels[i + 1] = (Math.floor(pixels[i + 1] / step) * step);
		pixels[i + 2] = (Math.floor(pixels[i + 2] / step) * step);
	}
}