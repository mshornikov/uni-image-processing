export const gamma = (pixels, gamma) => {
	if (gamma === 0) gamma = 1;
	if (gamma < 0) gamma = 1 / - gamma;
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] = 255 * Math.pow(pixels[i] / 255, gamma);
		pixels[i + 1] =  255 * Math.pow(pixels[i + 1] / 255, gamma);
		pixels[i + 2] =  255 * Math.pow(pixels[i + 2] / 255, gamma);
	}
}