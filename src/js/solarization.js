export const solarization = (pixels) => {
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] = 1/64 * pixels[i] * (255 - pixels[i]);
		pixels[i + 1] = 1/64 * pixels[i + 1] * (255 - pixels[i + 1]);
		pixels[i + 2] = 1/64 * pixels[i + 2] * (255 - pixels[i + 2]);
	}
}