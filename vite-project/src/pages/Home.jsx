import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
	return (
		<div className="w-full bg-slate-900 min-h-screen flex flex-col items-center justify-center">
			{/* Animated Background */}
			<div className="h-125 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg ">
				<div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
				<Boxes />

				{/* Main Content */}
				<h1
					className={cn(
						"md:text-5xl text-2xl text-white font-bold relative z-20"
					)}
				>
					Welcome to Algorithm Visualizer(WIP)
				</h1>
				<p className="text-center mt-2 text-neutral-300 text-lg relative z-20 max-w-2xl">
					Making complex algorithms easy to understand with interactive
					visualizations.
				</p>

				{/* Call to Action Buttons */}
				<div className="flex gap-4 mt-6 relative z-20">
					<Button variant="outline" className="px-6 bg-slate-800 text-white py-3 text-lg font-semibold">
						Start Visualizing
					</Button>
					<Button variant="outline" className="px-6 bg-slate-800 text-white py-3 text-lg font-semibold">
						Learn More
					</Button>
				</div>
			</div>

			{/* Feature Section */}
			<div className="mt-12 text-center text-white max-w-4xl">
				<h2 className="text-3xl font-bold">Explore Algorithm Categories</h2>
				<p className="mt-2 text-neutral-300">
					From sorting to pathfinding, visualize how algorithms work in
					real-time.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
					<Card className="bg-slate-800 shadow-lg hover:scale-110 duration-150">
						<CardHeader>
							<CardTitle className="text-xl text-white font-semibold">
								Sorting Algorithms
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-neutral-400 text-sm">
								Bubble Sort, Quick Sort, Merge Sort, and more.
							</p>
						</CardContent>
					</Card>
					<Card className="bg-slate-800 shadow-lg hover:scale-110 duration-150">
						<CardHeader>
							<CardTitle className="text-xl text-white font-semibold">
								Pathfinding
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-neutral-400 text-sm">
								Dijkstra's, A*, BFS, and DFS in action.
							</p>
						</CardContent>
					</Card>
					<Card className="bg-slate-800 text-white shadow-lg hover:scale-110 duration-150">
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
								Graph Algorithms
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-neutral-400 text-sm">
								Discover Prim's, Kruskal's, and Floyd-Warshall.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
