// type Checked = DropdownMenuCheckboxItemProps['checked'];

import { FilterMenuItem } from './filter-menu-item';
import { Button } from './ui/button';
import { RotateCcw } from 'lucide-react';
import { RecordContext } from '@/App';
import { useContext } from 'react';
import { toast } from 'sonner';

export const FilterMenuBar = () => {
	const { filters, setFilters } = useContext(RecordContext);
	return (
		<div className="sticky top-0 flex items-center justify-between w-full p-6 bg-white">
			<div className="space-x-2">
				{filters.map((filter, index) => (
					<FilterMenuItem
						key={index}
						{...filter}
						options={filter.options || []}
					/>
				))}
				<Button variant="secondary">필터 추가</Button>
			</div>
			<div className="space-x-2">
				<Button variant="link">고급 필터 적용</Button>
				<Button
					variant="ghost"
					onClick={() => {
						setFilters(prev =>
							prev.map(filter => ({
								...filter,
								options:
									filter.options?.map(option => ({
										...option,
										checked: true,
									})) ?? null,
							}))
						);
						toast.success('필터가 초기화되었습니다.');
					}}
				>
					<RotateCcw className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};
