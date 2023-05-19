export const histogram = pixels => {
  let data = new Array(256).fill(0);
    for (let i = 0; i <= pixels.length; i += 4) {
        const brightness = pixels[i] + pixels[i + 1] + pixels[i + 2];
        data[brightness / 3] += 1;
    } 
    // Определяем размеры графика
    const width = 245;
    const height = 150;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Создаем контейнер svg
    const svg = d3.select("#histogram")

    svg.selectAll("*").remove();

    // Создаем группу для гистограммы
    const histogram = svg.append("g")
                        //  .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Создаем шкалу для оси x
    const xScale = d3.scaleLinear()
                     .domain([0, 256])
                     .range([0, innerWidth]);

    // Создаем логарифмическую шкалу для оси y
    const yScale = d3.scaleLog()
                     .domain([1, d3.max(data)])
                     .range([innerHeight, 0]);

    // Создаем гистограмму
    histogram.selectAll("rect")
             .data(data)
             .enter()
             .append("rect")
             .attr("x", (d, i) => xScale(i))
             .attr("y", (d) => yScale(d))
             .attr("width", xScale(0.5))
             .attr("height", (d) => innerHeight - yScale(d))
             .attr("fill", "blueviolet");

    // // Создаем ось x
    // const xAxis = d3.axisBottom(xScale);
    // histogram.append("g")
    //          .attr("transform", `translate(0, ${innerHeight})`)
    //          .call(xAxis);

    // // Создаем ось y
    // const yAxis = d3.axisLeft(yScale).ticks(5, ".0s");
    // histogram.append("g")
    //          .call(yAxis);
}