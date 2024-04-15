import { useContext } from 'react';
import { ChevronDown } from 'lucide-react';

import { RecordContext } from '@/App';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SummaryItem from './summary-item';

export default function SummaryList() {
	const { fields } = useContext(RecordContext);
	return (
		<>
			<div className="p-6">
				<Collapsible className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="font-semibold">응답자 특성</h2>

						<div className="flex items-center gap-x-1">
							<span>열기</span>
							<CollapsibleTrigger asChild>
								<Button className="px-3" variant="ghost">
									<ChevronDown className="w-4 h-4" />
								</Button>
							</CollapsibleTrigger>
						</div>
					</div>
					<CollapsibleContent className="space-y-4">
						{fields
							?.filter(field => field.category === 'property')
							.map(field => (
								<SummaryItem key={field.id} {...field} />
							))}
					</CollapsibleContent>
				</Collapsible>
				<Separator className="mt-4" />
			</div>

			<div className="p-6 space-y-4">
				<h2 className="font-semibold">문항별 결과</h2>
				<div className="space-y-4">
					{fields
						?.filter(field => field.category === 'question')
						.map(question => (
							<SummaryItem key={question.id} {...question} />
						))}
				</div>
			</div>
		</>
	);
}
