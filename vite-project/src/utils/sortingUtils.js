import * as d3 from "d3";

export function drawBars(svgRef, data, width, height, margin, colorScale) {
	const svg = d3.select(svgRef.current).attr("width", width).attr("height", height).style("display", "block").style("margin", "auto");
	svg.selectAll("*").remove();

	const barWidth = (width - margin.left - margin.right) / data.length;

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(data)])
		.range([height - margin.bottom, margin.top]);

    const xScale = d3.scaleBand().domain(data.map((_, i) => i)).range([margin.left, width - margin.right]).padding(0.1);
    
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat((d) => d))
        .attr("color", "white");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .attr("color", "white");

	const bars = svg
		.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", (_, i) => xScale(i))
		.attr("y", (d) => yScale(d))
		.attr("width", xScale.bandwidth())
		.attr("height", (d) => height - margin.bottom - yScale(d))
		.attr("fill", (_,i) => colorScale(i) || "steelblue");
}

export function renderBoxes(svgRef, arr, boxWidth, spacing, colorScale) {
	const svg = d3.select(svgRef.current);
	svg.selectAll("*").remove();

	const totalWidth = arr.length * (boxWidth + spacing);
    svg.attr("width", totalWidth).attr("height", 100);

	const boxes = svg
		.selectAll("g")
		.data(arr)
		.enter()
		.append("g")
		.attr("transform", (_, i) => `translate(${i * (boxWidth + spacing)}, 0)`);

	boxes
		.append("rect")
		.attr("width", boxWidth)
		.attr("height", boxWidth)
		.attr("fill", (_,i) => colorScale(i) || "steelblue")
		.attr("rx", 8)
		.attr("ry", 8);

	boxes
		.append("text")
		.text((d) => d)
		.attr("x", boxWidth / 2)
		.attr("y", boxWidth / 2 + 6)
		.attr("fill", "#fff")
		.attr("text-anchor", "middle")
		.style("font-size", "18px");
}
