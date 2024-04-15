import { PropsWithChildren, useContext } from 'react';
import { ArrowRightLeft, FileBarChart2 } from 'lucide-react';

import { FieldState, RecordContext } from '@/App';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SummaryCard({
	id,
	name,
	kind,
	children,
}: PropsWithChildren<FieldState>) {
	const { records } = useContext(RecordContext);
	return (
		<Card id={id}>
			<CardHeader className="pb-0">
				<CardTitle className="text-base">{name}</CardTitle>
				<div className="flex items-center justify-between">
					<div className="flex items-center h-5 gap-x-2">
						<span className="text-sm">{kind}</span>
						<Separator orientation="vertical" />
						<span className="text-sm">
							총 응답수 {records.length.toLocaleString()}명
						</span>
					</div>
					<div className="flex items-center gap-x-2">
						<Button variant="secondary">
							<ArrowRightLeft className="w-4 h-4 mr-2" />
							<span>교차분석</span>
						</Button>
						<Button variant="secondary">
							<FileBarChart2 className="w-4 h-4 mr-2" />
							<span>보고서</span>
						</Button>
					</div>
				</div>
			</CardHeader>
			<Separator className="mx-6 my-2" />
			<CardContent>{children}</CardContent>
		</Card>
	);
}
