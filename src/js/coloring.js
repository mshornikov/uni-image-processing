export const coloring = (pixels) => {
	for (let i = 0; i < pixels.length; i += 4) {
		let gray = pixels[i] + pixels[i + 1] + pixels[i + 2];
		if (gray < 80) {
			pixels[i] = 130;
			pixels[i + 1] = 148;
 			pixels[i + 2] = 196;
		} else if (gray < 100) {	
			pixels[i] = 219;
			pixels[i + 1] = 223;
			pixels[i + 2] = 234;
		} else if (gray < 135) {
			pixels[i] = 175;
			pixels[i + 1] = 211;
 			pixels[i + 2] = 226;
		} else if (gray < 200) {
			pixels[i] = 255;
			pixels[i + 1] = 234;
			pixels[i + 2] = 210;
		} else {
			pixels[i] = 249;
			pixels[i + 1] = 123;
 			pixels[i + 2] = 34;
		};
	}
}