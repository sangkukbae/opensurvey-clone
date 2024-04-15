import { useContext, useState } from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
	ArrowDownToLine,
	BarChart3,
	BarChartHorizontal,
	Circle,
	PieChart,
} from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { FieldState, RecordContext } from '@/App';
import { colorList } from '@/constants';

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

type ChartType = 'pie' | 'doughnut' | 'bar-horizontal' | 'bar-vertical';

export default function Chart(item: FieldState) {
	const barOption = ['객관식 중복', '객관식 순위'].includes(item.kind);

	const { records, fields } = useContext(RecordContext);

	const [currentChart, setCurrentChart] = useState<ChartType>(
		barOption ? 'bar-horizontal' : 'pie'
	);

	// Get the options of the field
	const fieldOptions = fields?.find(field => field.name === item.name)?.options;

	// Count the number of each value
	const temp = records
		.map(record => record[item.name])
		.reduce((acc: { [key: string]: number }, cur) => {
			if (typeof cur === 'number') {
				acc[cur] = (acc[cur] || 0) + 1;
			} else if (Array.isArray(cur)) {
				cur.forEach(option => {
					acc[option] = (acc[option] || 0) + 1;
				});
			} else {
				fieldOptions?.forEach(option => {
					option.name === cur &&
						(acc[option.name] = (acc[option.name] || 0) + 1);
				});
			}

			return acc;
		}, {});

	// Transform the data for the age field
	function transformData(data: { [key: string]: number }): {
		[key: string]: number;
	} {
		const ranges: { [key: string]: number } = {};
		for (const age in data) {
			const ageNumber = parseInt(age);
			const count = data[age];
			const lowerBound = Math.floor(ageNumber / 5) * 5; // Find the lower bound of the 5-year range
			const upperBound = lowerBound + 4; // Upper bound is 4 years after the lower bound
			const rangeKey =
				ageNumber >= 60 ? '60_up' : `${lowerBound}_${upperBound}`; // Special key for 60 and above

			if (!ranges[rangeKey]) {
				ranges[rangeKey] = 0; // Initialize the range key if it doesn't exist
			}
			ranges[rangeKey] += count; // Aggregate counts within the range
		}
		return ranges;
	}

	const keys = Object.keys(item.name === '나이' ? transformData(temp) : temp);
	const values = Object.values(
		item.name === '나이' ? transformData(temp) : temp
	);

	const data = {
		labels: keys,
		datasets: [
			{
				data: values,
				backgroundColor: keys.map((_, i) => colorList[i % colorList.length]),
			},
		],
	};

	const options = { responsive: true };

	const chartOptions = barOption
		? ['bar-horizontal', 'bar-vertical']
		: ['pie', 'doughnut', 'bar-horizontal', 'bar-vertical'];

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<Tabs defaultValue="example" className="w-[400px]">
						<TabsList>
							<TabsTrigger value="example">보기순</TabsTrigger>
							<TabsTrigger value="response">응답순</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<div className="space-x-1">
					{chartOptions.map(chart => (
						<Button
							className={cn('px-3', {
								'bg-secondary': currentChart === chart,
							})}
							variant="ghost"
							onClick={() => setCurrentChart(chart as ChartType)}
							key={chart}
						>
							{chart === 'pie' && <PieChart className="w-4 h-4" />}
							{chart === 'doughnut' && <Circle className="w-4 h-4" />}
							{chart === 'bar-horizontal' && (
								<BarChartHorizontal className="w-4 h-4" />
							)}
							{chart === 'bar-vertical' && <BarChart3 className="w-4 h-4" />}
						</Button>
					))}

					<Button>
						<ArrowDownToLine className="w-4 h-4 mr-2" />
						<span>차트 저장</span>
					</Button>
				</div>
			</div>

			<Separator className="my-2" />

			<div className="w-full h-[350px]">
				{currentChart === 'pie' && <Pie data={data} options={options} />}
				{currentChart === 'doughnut' && (
					<Doughnut data={data} options={options} />
				)}
				{currentChart === 'bar-horizontal' && (
					<Bar data={data} options={{ ...options, indexAxis: 'y' as const }} />
				)}
				{currentChart === 'bar-vertical' && (
					<Bar data={data} options={options} />
				)}
			</div>
		</>
	);
}
