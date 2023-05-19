export const histogram = pixels => {
  let data = new Array(255).fill(0);
    for (let i = 0; i < pixels.length; i += 4) {
        data[pixels[i]] += 1;
  }
    // Определяем размеры графика
    const width = 260;
    const height = 150;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;



    // Создаем контейнер svg
    const svg = d3.select("#histogram")
                  .attr("width", width)
                  .attr("height", height);

    svg.selectAll("*").remove();


    // Создаем группу для гистограммы
    const histogram = svg.append("g")
                         .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Создаем шкалу для оси x
    const xScale = d3.scaleLinear()
                     .domain([0, 300])
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
             .attr("width", xScale(1))
             .attr("height", (d) => innerHeight - yScale(d))
             .attr("fill", "steelblue");

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