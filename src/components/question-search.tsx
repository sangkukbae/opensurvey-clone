import { useContext, useState } from 'react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarContext } from './sidebar';
import { RecordContext } from '@/App';

export const QuestionSearch = () => {
	const [search, setSearch] = useState('');

	const { setSelectedQuestions } = useContext(SidebarContext);
	const { fields } = useContext(RecordContext);

	const kindCount = fields
		?.filter(field => field.category === 'question')
		.reduce((acc, cur) => {
			acc[cur.kind] = (acc[cur.kind] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

	return (
		<div className="p-4 space-y-2 rounded-md bg-accent">
			<Input
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder="문항 검색"
			/>
			<Separator />
			<Accordion type="single" collapsible defaultValue="view-by-question">
				<AccordionItem className="space-y-2" value="view-by-question">
					<AccordionTrigger className="p-2">문항 유형별보기</AccordionTrigger>
					<AccordionContent className="space-y-2">
						{Object.keys(kindCount || {})
							.filter(kind => kind.includes(search))
							// .sort((a, b) => a.localeCompare(b))
							.map(kind => (
								<div className="flex items-center gap-x-2" key={kind}>
									<Checkbox
										id={kind}
										name={kind}
										onCheckedChange={(checked: boolean) => {
											if (checked) {
												setSelectedQuestions(prev => [...prev, kind]);
											} else {
												setSelectedQuestions(prev =>
													prev.filter(q => q !== kind)
												);
											}
										}}
									/>
									<label className="text-muted-foreground" htmlFor={kind}>
										{kind}
									</label>
									<span className="text-muted-foreground">
										{kindCount?.[kind] ?? ''}
									</span>
								</div>
							))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
