export const contrastInc = (pixels, Q1, Q2) => {
	for (let i = 0; i < pixels.length; i += 4) {
		// let color = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
		if (pixels[i] < Q1) pixels[i] = 0;
		else if (pixels[i] > Q2) pixels[i] = 255;
		else pixels[i] = 255 * (pixels[i] - Q1)/(Q2 - Q1);
		if (pixels[i + 1] < Q1) pixels[i + 1] = 0;
		else if (pixels[i + 1] > Q2) pixels[i + 1] = 255;
		else pixels[i + 1] = 255 * (pixels[i + 1] - Q1)/(Q2 - Q1);
		if (pixels[i + 2] < Q1) pixels[i + 2] = 0;
		else if (pixels[i + 2] > Q2) pixels[i + 2] = 255;
		else pixels[i + 2] = 255 * (pixels[i + 2] - Q1)/(Q2 - Q1);
		// [pixels[i], pixels[i + 1], pixels[i + 2]] = [color, color, color]
	}
}

export const contrastDec = (pixels, Q1, Q2) => {
	for (let i = 0; i < pixels.length; i += 4) {
		// let color = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

		pixels[i] = Q1 + pixels[i] * (Q2 - Q1) / 255;
		pixels[i + 1] = Q1 + pixels[i + 1] * (Q2 - Q1) / 255;
		pixels[i + 2] = Q1 + pixels[i + 2] * (Q2 - Q1) / 255;
		// [pixels[i], pixels[i + 1], pixels[i + 2]] = [color, color, color]
	}
}