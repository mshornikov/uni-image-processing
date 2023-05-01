export const histogram = pixels => {
	// let colors = new Array(255).fill(0);

    // for (let i = 0; i < pixels.length; i += 4) {
	// 	colors[pixels[i]] += 1;
	// }
	const canvas = document.querySelector('.canvas');


	const histogram = d3.histogram()
        .value(d => d)
        .domain([0, 255])
        .thresholds(256)
        (pixels);
      const xScale = d3.scaleLinear()
        .domain([0, 255])
        .range([0, canvas.width]);
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(histogram, d => d.length)])
        .range([canvas.height, 0]);
      const barWidth = canvas.width / histogram.length;
      const bars = d3.select(canvas)
        .selectAll('rect')
        .data(histogram)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d.length))
        .attr('width', barWidth)
        .attr('height', d => canvas.height - yScale(d.length))
        .attr('fill', 'steelblue');

	// console.log(colors);
}