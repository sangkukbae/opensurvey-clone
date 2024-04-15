import { FieldState } from '@/App';
import Chart from './chart';
import SummaryCard from './summary-card';
import WordCloud from './word-cloud';

export default function SummaryItem(item: FieldState) {
	return (
		<SummaryCard {...item}>
			{item.kind === '주관식 서술' ? (
				<WordCloud {...item} />
			) : (
				<Chart {...item} />
			)}
		</SummaryCard>
	);
}
