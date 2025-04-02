import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { BubbleSortVisualizer } from "../components/componentIndex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const bubbleSortAlgorithms = {
	"tab-1": `function bubbleSort(arr) {
for (let i = 0; i < arr.length - 1; i++) {
	for (let j = 0; j < arr.length - i - 1; j++) {
		if (arr[j] > arr[j + 1]) {
			[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
		}
	}
}
return arr;
}`,
	"tab-2": `void bubbleSort(int arr[], int n) {
for (int i = 0; i < n - 1; i++) {
	for (int j = 0; j < n - i - 1; j++) {
		if (arr[j] > arr[j + 1]) {
			int temp = arr[j];
			arr[j] = arr[j + 1];
			arr[j + 1] = temp;
		}
	}
}
}`,
	"tab-3": `void bubbleSort(int arr[], int n) {
for (int i = 0; i < n - 1; i++) {
	for (int j = 0; j < n - i - 1; j++) {
		if (arr[j] > arr[j + 1]) {
			swap(arr[j], arr[j + 1]);
		}
	}
}
}`,
	"tab-4": `def bubble_sort(arr):
n = len(arr)
for i in range(n - 1):
	for j in range(n - i - 1):
		if arr[j] > arr[j + 1]:
			arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
};

function BubbleSort() {
	const sampleData = [5, 7, 6, 4, 2, 2, 1, 3, 8, 9, 1];

	const [copied, setCopied] = useState(false);

	const handleCopy = (tab, code) => {
		navigator.clipboard.writeText(code);
		setCopied(tab);
		setTimeout(() => setCopied(""), 2000); // Reset after 2s
	};

	return (
		<div className="flex min-h-screen bg-slate-900 p-6 gap-6">
			{/* Left: Sorting Visualization */}
			<div className="w-1/2 bg-slate-800 p-6 rounded-lg">
				<h2 className="text-white text-2xl mb-4">Bubble Sort Visualization</h2>
				<BubbleSortVisualizer data={sampleData} />
			</div>

			{/* Right: Code Snippet */}
			<Card className="w-1/2 bg-slate-800 border-0">
				<CardHeader>
					<CardTitle className={"text-3xl font-bold text-yellow-400"}>
						Bubble Sort Algorithm
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-lg text-white">
						Bubble Sort is a simple sorting algorithm that repeatedly steps
						through the list, compares adjacent elements, and swaps them if they
						are in the wrong order. This process is repeated until the list is
						sorted.
					</p>

					<h2 className="text-2xl font-semibold text-yellow-300 mt-4">
						How It Works
					</h2>
					<ol className="text-white list-decimal pl-6 space-y-2">
						<li>Start at the beginning of the array.</li>
						<li>
							Compare the first two elements. If the first is greater than the
							second, swap them.
						</li>
						<li>
							Move to the next pair and repeat until the end of the array.
						</li>
						<li>
							Repeat the entire process for all elements until no swaps are
							needed.
						</li>
					</ol>

					<h2 className="text-2xl font-semibold text-yellow-300 mt-4">
						Time and Space Complexity
					</h2>
					<table className="w-full mt-4 border border-gray-600 rounded-lg">
						<thead>
							<tr className="bg-gray-600">
								<th className="p-2 border border-gray-500 text-slate-200">
									Best Case
								</th>
								<th className="p-2 border border-gray-500 text-slate-200">
									Average Case
								</th>
								<th className="p-2 border border-gray-500 text-slate-200">
									Worst Case
								</th>
								<th className="p-2 border border-gray-500 text-slate-200">
									Space Complexity
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-center bg-gray-800">
								<td className="p-2 border border-gray-600 text-green-400">
									O(n)
								</td>
								<td className="p-2 border border-gray-600 text-white">O(n²)</td>
								<td className="p-2 border border-gray-600 text-red-400">
									O(n²)
								</td>
								<td className="p-2 border border-gray-600 text-white">O(1)</td>
							</tr>
						</tbody>
					</table>
					<h2 className="text-2xl font-semibold text-yellow-300 mt-4">
						Example Code
					</h2>
					<Tabs defaultValue="tab-1" className="mt-2 inline-block w-full">
						<TabsList className="relative h-auto w-1/2 gap-0.5 bg-slate-800 p-0 border-none before:absolute before:inset-x-0 before:bottom-0 before:h-px">
							<TabsTrigger
								value="tab-1"
								className="overflow-hidden rounded-b-none border-b-0 bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:bg-slate-900 data-[state=active]:text-white duration-150 hover:bg-slate-300"
							>
								Javascript
							</TabsTrigger>
							<TabsTrigger
								value="tab-2"
								className="overflow-hidden rounded-b-none border-b-0 bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:bg-slate-900 data-[state=active]:text-white duration-150 hover:bg-slate-300"
							>
								C
							</TabsTrigger>
							<TabsTrigger
								value="tab-3"
								className="overflow-hidden rounded-b-none border-b-0 bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:bg-slate-900 data-[state=active]:text-white duration-150 hover:bg-slate-300"
							>
								C++
							</TabsTrigger>
							<TabsTrigger
								value="tab-4"
								className="overflow-hidden rounded-b-none border-b-0 bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:bg-slate-900 data-[state=active]:text-white duration-150 hover:bg-slate-300"
							>
								Python
							</TabsTrigger>
						</TabsList>
						{Object.entries(bubbleSortAlgorithms).map(([key, code]) => (
							<TabsContent key={key} value={key}>
								<div className="relative">
									<Button
										onClick={() => handleCopy(key, code)}
										className={`absolute top-2 right-2 bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 duration-200 ${copied === key ? "bg-green-400 hover:bg-green-400" : ""}`}
									>
										{copied === key ? "Copied to clipboard!" : "Copy"}
									</Button>
									<pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
										{code}
									</pre>
								</div>
							</TabsContent>
						))}
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}

export default BubbleSort;
