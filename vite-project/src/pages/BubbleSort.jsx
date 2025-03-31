import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import {Visualizer} from "../components/componentIndex"

function BubbleSort() {
	const sampleData = [42, 15, 89, 53, 24, 38, 12, 3, 47, 29, 16, 8, 33]
	return (
		<div className="flex min-h-screen bg-slate-900 p-6 gap-6">
			{/* Left: Sorting Visualization */}
			<div className="w-1/2 bg-slate-800 p-6 rounded-lg">
				<h2 className="text-white text-2xl mb-4">Bubble Sort Visualization</h2>
				<Visualizer data={sampleData} />
			</div>

			{/* Right: Code Snippet */}
			<Card className="w-1/2">
				<CardHeader>
					<CardTitle>Bubble Sort Algorithm</CardTitle>
				</CardHeader>
				<CardContent>
					<pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
						{`function bubbleSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      return arr;
    }`}
					</pre>
				</CardContent>
			</Card>
		</div>
	);
}

export default BubbleSort;
