import { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud, { Word } from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeTableau10 } from 'd3-scale-chromatic';

import { FieldState, RecordContext } from '@/App';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from '@radix-ui/react-separator';

export default function WordCloud(item: FieldState) {
	const { records } = useContext(RecordContext);

	const ref = useRef<SVGSVGElement | null>(null);

	const temp = records
		.map(record => record[item.name])
		.reduce((acc: { [key: string]: number }, cur) => {
			if (typeof cur === 'string' && cur.trim() !== '') {
				acc[cur.trim()] = (acc[cur.trim()] || 0) + 1;
			} else if (Array.isArray(cur)) {
				cur.forEach((value: string) => {
					if (value.trim() !== '') {
						acc[value.trim()] = (acc[value.trim()] || 0) + 1;
					}
				});
			}
			return acc;
		}, {});

	const words = Object.entries(temp).map(([word, count]) => ({
		text: word,
		size: count,
	}));

	useEffect(() => {
		if (ref.current) {
			const width = 700;
			const height = 350;
			const fill = scaleOrdinal(schemeTableau10); // Define a color scale

			const svgElement = d3.select(ref.current);

			svgElement.selectAll('*').remove(); // Clear SVG on re-render

			const svg = svgElement
				.attr('width', width)
				.attr('height', height)
				.append('g')
				.attr('transform', `translate(${width / 2}, ${height / 2})`);

			const wordLayout = cloud<Word>()
				.size([width, height])
				.words(words.map(d => ({ ...d, size: Math.log2(d.size + 1) * 5 }))) // Scale word size
				.padding(5)
				.rotate(() => (~~(Math.random() * 6) - 3) * 0) // Random rotation
				.fontSize(d => d.size || 0)
				.on('end', draw);

			// eslint-disable-next-line no-inner-declarations
			function draw(data: Word[]) {
				svg
					.selectAll('text')
					.data(data)
					.join('text')
					.style('font-size', d => `${d.size}px`)
					.style('font-family', 'Impact')
					.style('fill', (_, i) => fill(i.toString())) // Apply color using the color scale
					.attr('text-anchor', 'middle')
					.attr(
						'transform',
						d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
					)
					.text(d => d.text!);
			}
			wordLayout.start();

			return () => {
				svgElement.selectAll('*').remove();
			}; // Cleanup SVG on component unmount
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<Tabs defaultValue="word-cloud" className="w-[400px]">
						<TabsList>
							<TabsTrigger value="word-cloud">워드클라우드</TabsTrigger>
							<TabsTrigger value="text-source">문자 응답 원본</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>
			<Separator className="my-2" />
			<svg ref={ref} />
		</>
	);
}
