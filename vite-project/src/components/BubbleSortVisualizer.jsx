import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Container } from "./componentIndex";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { drawBars, renderBoxes } from "../utils/sortingUtils";

function BubbleSortVisualizer({ data }) {
	const [isSorting, setIsSorting] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [logs, setLogs] = useState([]);
	const animationSpeedRef = useRef(1000);
	const isPlayingRef = useRef(false);
	const dataRef = useRef([...data]);
	const boxedArrayRef = useRef(null);
	const barChartRef = useRef(null);
	const abortRef = useRef(false);

	useEffect(() => {
        drawBars(barChartRef, data, width, height, margin, colorScale);
		renderBoxes(boxedArrayRef, data, boxWidth, spacing, colorScale);
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

	//color scale
	const uniqueData = [...new Set(data)];
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(uniqueData);

	//chart attributes
	const width = 600;
	const height = 300;
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	let yScale;

	//boxes attributes
	const boxWidth = 49;
    const spacing = 5;

	const delay = async (ms = animationSpeedRef.current) => {
		if(abortRef.current) return;
		await new Promise((res) => setTimeout(res, ms));
	}
	
	const bubbleSort = async () => {
		if (isSorting) return;
		setIsSorting(true);
		abortRef.current = false;
		setIsPlaying(true);
		isPlayingRef.current = true;

		yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height - margin.bottom, margin.top]);

		let arr = [...dataRef.current];
		addLogs("Initial Array: [" + arr.join(", ") + "]");
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - i - 1; j++) {
				if (abortRef.current) return;
				while(!isPlayingRef.current) {
					if (abortRef.current) return;
					await delay(100);
				};

				d3.select(barChartRef.current)
                .selectAll("rect")
                .attr("fill", (_, index) => (index === j || index === j + 1 ? "orange" : "steelblue"));

				d3.select(boxedArrayRef.current)
				.selectAll("g rect")
				.attr("fill", (_, index) => (index === j || index === j + 1 ? "orange" : "steelblue"));
				
				if (abortRef.current) return;
				await delay(animationSpeedRef.current-200);

				if (arr[j] > arr[j + 1]) {
					addLogs(`Swapping [${arr[j]} and ${arr[j + 1]}]`);
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
					dataRef.current = [...arr];

					await delay()
					
					d3.select(barChartRef.current)
						.selectAll("rect")
						.data(arr)
						.transition()
						.duration(100)
						.attr("y", (d) => yScale(d))
						.attr("height", (d) => height - margin.bottom - yScale(d));
					
					d3.select(boxedArrayRef.current)
						.selectAll("g")
						.data(arr)
						.select("text")
						.transition()
						.duration(500)
						.text((d) => d);

					await delay(animationSpeedRef.current-200);
				}
			}
		}

		addLogs("Sorted Array: [" + arr.join(", ") + "]");
		d3.select(barChartRef.current).selectAll("rect").attr("fill", d3.scaleOrdinal(d3.schemeCategory10));
		d3.select(boxedArrayRef.current).selectAll("g rect").attr("fill", "#55e463");

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
		abortRef.current = true;
		d3.select(barChartRef.current).selectAll("rect").interrupt();
		d3.active(document.querySelector("rect"))?.end();
		d3.select(boxedArrayRef.current).selectAll("g rect").attr("fill", (_,i) => colorScale(i));
		isPlayingRef.current = false;
		setIsPlaying(false);
		setIsSorting(false);
		dataRef.current = [...data];
		setLogs([]);
		drawBars(barChartRef, dataRef.current, width, height, margin, colorScale);
		renderBoxes(boxedArrayRef, dataRef.current, boxWidth, spacing, colorScale);
	}

	const addLogs = (log) => {
		setLogs((prevLogs) => [...prevLogs, log]);
	}

	return (
		<Container>
			<div className="bg-slate-600 rounded-lg w-full overflow-x-auto pl-3">
				<div className="min-w-max">
					<svg ref={barChartRef} className="w-full"></svg>
					<br />
					<svg ref={boxedArrayRef}></svg>
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

//TODO:
//Maybe: StepTracking 