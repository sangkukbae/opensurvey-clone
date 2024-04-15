import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from './ui/button';
import { RecordContext } from '@/App';
import { useContext } from 'react';

export const UserPropertySelector = () => {
	const { fields } = useContext(RecordContext);

	const properties =
		fields?.filter(field => field.category === 'property') || [];
	return (
		<div className="">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>응답자 특성</AccordionTrigger>
					<AccordionContent className="space-y-2">
						{properties.map(property => (
							<Button
								className="justify-start w-full"
								variant="outline"
								key={property.id}
								onClick={() => {
									// Scroll to the property
									const el = document.getElementById(property.id);
									if (el) {
										el.scrollIntoView({ behavior: 'smooth' });
									}
								}}
							>
								{property.name}
							</Button>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
