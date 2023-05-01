export const adjustBrightness = (pixels, adjustment) => {
    for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] += adjustment
		pixels[i + 1] += adjustment
		pixels[i + 2] += adjustment
	}
}