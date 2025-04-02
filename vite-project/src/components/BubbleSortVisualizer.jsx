import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Container } from "./componentIndex";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

function BubbleSortVisualizer({ data }) {
	const [isSorting, setIsSorting] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [logs, setLogs] = useState([]);
	const animationSpeedRef = useRef(1000);
	const isPlayingRef = useRef(false);
	const dataRef = useRef([...data]);
	const animationRef = useRef(null);

	useEffect(() => {
        drawBars();
	}, [data]);

	useEffect(() => {
		const logContainer = document.getElementById("log-container")
		if(logContainer){
			logContainer.scrollTo({
				top: logContainer.scrollHeight,
				behavior: "smooth", // Enables smooth scrolling
			});
		}
	}, [logs]);

	const width = 600;
	const height = 300;
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	let yScale;

	const drawBars = () => {

		const svg = d3.select("#visualizer-svg").attr("width", width).attr("height", height).style("display", "block").style("margin", "auto");

		svg.selectAll("*").remove();
		yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height - margin.bottom, margin.top]);
        const xScale = d3.scaleBand().domain(data.map((_, i) => i)).range([margin.left, width - margin.right]).padding(0.1);

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

		svg
			.selectAll("rect")
			.data(dataRef.current)
			.enter()
			.append("rect")
			.attr("x", (_, i) => xScale(i))
			.attr("y", (d) => yScale(d))
			.attr("width", xScale.bandwidth())
			.attr("height", (d) => height - margin.bottom - yScale(d))
			.attr("fill", (_,i) => colorScale(i));
	};

	const bubbleSort = async () => {
		if (isSorting) return;
		setIsSorting(true);
		setIsPlaying(true);
		isPlayingRef.current = true;

		yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height - margin.bottom, margin.top]);

		let arr = [...dataRef.current];
		addLogs("Initial Array: [" + arr.join(", ") + "]");
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - i - 1; j++) {
				while(!isPlayingRef.current) {
					await new Promise((resolve) => setTimeout(resolve, 100));
				};

				d3.select("#visualizer-svg")
                .selectAll("rect")
                .attr("fill", (_, index) => (index === j || index === j + 1 ? "orange" : "steelblue"));
				
				await new Promise((resolve) => setTimeout(resolve, animationSpeedRef.current-200));

				if (arr[j] > arr[j + 1]) {
					addLogs(`Swapping [${arr[j]} and ${arr[j + 1]}]`);
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
					dataRef.current = [...arr];

					await new Promise((resolve) => setTimeout(resolve, animationSpeedRef.current));
					
					animationRef.current = d3.select("#visualizer-svg").selectAll("rect")
						.data(arr)
						.transition()
						.duration(100)
						.attr("y", (d) => yScale(d))
						.attr("height", (d) => height - margin.bottom - yScale(d));
				}
			}
		}

		addLogs("Sorted Array: [" + arr.join(", ") + "]");
		d3.select("#visualizer-svg").selectAll("rect").attr("fill", d3.scaleOrdinal(d3.schemeCategory10));

		setIsSorting(false);
		setIsPlaying(false);
		isPlayingRef.current = false;
	};

	const handlePlayPause = () => {
		if(isSorting){
			isPlayingRef.current = !isPlayingRef.current;
			setIsPlaying(!isPlaying);
		}
		else{
			isPlayingRef.current = true;
			bubbleSort();
		}
	}

	const handleRestart = () => {
		d3.select("#visualizer-svg").selectAll("rect").interrupt();
		isPlayingRef.current = false;
		setIsSorting(false);
		dataRef.current = [...data];
		setLogs([]);
		drawBars();
	}

	const addLogs = (log) => {
		setLogs((prevLogs) => [...prevLogs, log]);
	}

	return (
		<Container>
			<div className="bg-slate-600 rounded-lg w-full overflow-x-auto pl-3">
				<div className="min-w-max">
					<svg id="visualizer-svg" className="w-full"></svg>
				</div>
			</div>
			<div className="bg-slate-600 mt-3 rounded-lg w-full flex p-2 justify-evenly">
				<Button variant="outline" onClick={handlePlayPause} size="icon" className="hover:bg-slate-200 hover:cursor-pointer">
					{isPlaying ? <Pause /> : <Play />}
				</Button>
				<Button variant="outline" onClick={handleRestart} size="icon" className="hover:bg-slate-200 hover:cursor-pointer">
					<RotateCcw />
				</Button>
				<div className="flex min-w-[300px]">
					<h3 className="text-white mr-3 pt-1">Speed:</h3>
					<Slider defaultValue={[animationSpeedRef.current]} max={1500} step={100} min={500} className={"[&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"} onValueChange={(value) => animationSpeedRef.current=2000 - value[0]}/>
				</div>
			</div>
			<div id="log-container" className="bg-gray-900 text-white p-4 rounded-lg max-h-70 overflow-auto mt-3 w-full">
				<div className="bg-slate-600 p-1 top-0 left-0 w-auto inline-block z-1 sticky">
					<h2>Output Log</h2>
				</div>
				{logs.map((log, index) => (
					<p key={index} className="text-sm font-bold my-2 scroll-auto">{log}</p>
				))}
			</div>
		</Container>
    );
}

export default BubbleSortVisualizer;

//TODO: Boxed output logged
//Maybe: StepTracking 