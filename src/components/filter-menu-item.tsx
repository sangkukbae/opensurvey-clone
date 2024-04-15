/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from 'react';
import { FilterIcon, Loader2 } from 'lucide-react';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FilterItem, FilterItemOption } from '@/types';
import { RecordContext } from '@/App';

interface FilterMenuItemProps extends FilterItem {
	options: FilterItemOption[];
}

export const FilterMenuItem = ({ name, options }: FilterMenuItemProps) => {
	const { filters, setFilters } = useContext(RecordContext);
	const [isAllSelected, setIsAllSelected] = useState(
		options.some(option => option.checked)
	);
	const [tempOptions, setTempOptions] = useState(options);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsAllSelected(tempOptions.some(option => option.checked));
	}, [tempOptions]);

	useEffect(() => {
		setTempOptions(filters.find(filter => filter.name === name)?.options || []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<span>{name}</span>
					<FilterIcon className="w-4 h-4 ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="space-y-2">
				<div className="flex items-center gap-x-2">
					<Checkbox
						checked={isAllSelected}
						onCheckedChange={(checked: boolean) => {
							setIsAllSelected(checked);

							setTempOptions(() =>
								tempOptions.map(option => ({
									...option,
									checked,
								}))
							);
						}}
					/>
					<label>전체 선택</label>
				</div>
				<Separator className="my-2" />
				<form
					className="space-y-2"
					onSubmit={e => {
						e.preventDefault();

						const formData = new FormData(e.target as HTMLFormElement);

						const updatedFilters = filters.map(filter =>
							filter.name === name
								? {
										...filter,
										options:
											filter.options &&
											filter.options.map(option => ({
												...option,
												checked: formData.has(option.name),
											})),
								  }
								: filter
						);

						setFilters(updatedFilters);

						setIsLoading(false);
					}}
				>
					<div className="max-h-[270px] overflow-y-auto space-y-2">
						{tempOptions.map(({ id, name, checked }) => (
							<div className="flex items-center gap-x-2" key={id}>
								<Checkbox
									name={name}
									checked={checked}
									onCheckedChange={(checked: boolean) => {
										setTempOptions(prev => {
											return prev.map(option => {
												if (option.id === id) {
													return {
														...option,
														checked,
													};
												}

												return option;
											});
										});
									}}
								/>
								<label>{name}</label>
							</div>
						))}
					</div>
					<Button
						className="w-full"
						type="submit"
						onClick={() => setIsLoading(true)}
					>
						<span>적용</span>
						{isLoading ? <Loader2 className="w-4 h-4" /> : null}
					</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
};
