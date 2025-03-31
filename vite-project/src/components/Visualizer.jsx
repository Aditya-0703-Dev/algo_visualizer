import React, { useEffect } from "react";
import * as d3 from "d3";

function Visualizer({ data }) {
	useEffect(() => {
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

		const svg = d3.select("#visualizer-svg").attr("width", width).attr("height", height).style("display", "block").style("margin", "auto");

		svg.selectAll("*").remove();

        const xScale = d3.scaleBand().domain(data.map((_, i) => i)).range([margin.left, width - margin.right]).padding(0.1);
        const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height - margin.bottom, margin.top]);

        const uniqueData = [...new Set(data)];
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(uniqueData);

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
			.attr("fill", (_,i) => colorScale(i));

		//bubble sort
		const bubbleSort = async () => {
			let arr = [...data];
			for (let i = 0; i < arr.length - 1; i++) {
				for (let j = 0; j < arr.length - i - 1; j++) {
					if (arr[j] > arr[j + 1]) {
						[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
						await new Promise((resolve) => setTimeout(resolve, 300));
						bars
							.data(arr)
							.transition()
							.duration(300)
							.attr("y", (d) => yScale(d))
							.attr("height", (d) => height - margin.bottom - yScale(d));
					}
				}
			}
		};

		bubbleSort();
	}, [data]);
	return (
        <div className="bg-slate-600 rounded-lg w-full">
            <svg id="visualizer-svg" className="w-full"></svg>
        </div>
    );
}

export default Visualizer;


//TODO: SpeedSlider, Start/StopButton, ResetButton, SwapLogging
//Maybe: StepTracking 