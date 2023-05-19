export const negative = (pixels, threshold) => {
    for (let i = 0; i < pixels.length; i += 4) {
		if ((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3 > threshold) {
			pixels[i] = 255 - pixels[i];
			pixels[i + 1] = 255 - pixels[i + 1];
			pixels[i + 2] = 255 - pixels[i + 2];
		} 
	}
}