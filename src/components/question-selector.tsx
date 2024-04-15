import { useContext } from 'react';

import { SidebarContext } from './sidebar';
import { RecordContext } from '@/App';

export const QuestionSelector = () => {
	const { selectedQuestions } = useContext(SidebarContext);
	const { fields } = useContext(RecordContext);

	const questions =
		fields?.filter(field => field.category === 'question') || [];
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-x-2">
				<span className="font-medium">설문 문항</span>
				<span className="px-1 text-sm rounded-full w-fit bg-muted text-muted-foreground">
					{selectedQuestions.length > 0
						? questions.filter(q => selectedQuestions.includes(q.kind)).length
						: questions.length}
					문항
				</span>
			</div>
			<ul className="space-y-2">
				{questions
					.filter(q =>
						selectedQuestions.length > 0
							? selectedQuestions.includes(q.kind)
							: true
					)
					.map((question, index) => {
						const [num, text] = question.name.split('. ');
						return (
							<div
								className="p-3 space-y-2 transition-colors border rounded-md cursor-pointer hover:bg-accent"
								key={index}
								onClick={() => {
									// Scroll to the question
									const el = document.getElementById(question.id);
									if (el) {
										el.scrollIntoView({ behavior: 'smooth' });
									}
								}}
							>
								<div className="flex items-center gap-x-1">
									<span className="text-sm font-medium">{num}</span>
									<span className="text-sm text-muted-foreground">
										{question.kind}
									</span>
								</div>
								<p className="text-sm">{text}</p>
							</div>
						);
					})}
			</ul>
		</div>
	);
};
