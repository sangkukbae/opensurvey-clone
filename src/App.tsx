/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';

import { FilterMenuBar } from './components/filter-menu-bar';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { SurveyOverview } from './components/survey-overview';
import { axiosInstance, table } from './lib/airtable';
import { Record, FilterItem } from './types';
import { ageOptions, questionMapToKind } from './constants';
import { Loader2 } from 'lucide-react';
import SummaryList from './components/summary-list';

export interface RecordContextType {
	records: Record[];
	setRecords: Dispatch<SetStateAction<Record[]>>;
	filters: FilterItem[];
	setFilters: Dispatch<SetStateAction<FilterItem[]>>;
	fields: FieldState[] | undefined;
	setFields: Dispatch<SetStateAction<FieldState[] | undefined>>;
}

export const RecordContext = createContext<RecordContextType>({
	records: [],
	setRecords: () => {},
	filters: [],
	setFilters: () => {},
	fields: [],
	setFields: () => {},
});

interface Field {
	id: string;
	type: string;
	name: string;
	options: {
		choices: FieldOption[];
	};
}

interface FieldOption {
	id: string;
	name: string;
	color: string;
}

export interface FieldState {
	id: string;
	name: string;
	type: string;
	kind: string;
	category: string;
	options: {
		id: string;
		name: string;
		color: string;
		checked: boolean;
	}[];
}

function App() {
	const [records, setRecords] = useState<Record[]>([]);
	const [filters, setFilters] = useState<FilterItem[]>([]);
	const [fields, setFields] = useState<FieldState[]>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const getBaseSchema = async () => {
			try {
				const result = await axiosInstance.get(
					`https://api.airtable.com/v0/meta/bases/${
						import.meta.env.VITE_AIRTABLE_BASE_ID
					}/tables`
				);

				if (result.status === 200) {
					if (result.data.tables.length > 0) {
						const fields = result.data.tables[0].fields;

						setFields(() => {
							return fields.map((field: Field, index: number) => ({
								...field,
								kind: questionMapToKind[(index + 1).toString()],
								category: field.name.startsWith('Q') ? 'question' : 'property',
								options:
									field.name === '나이'
										? ageOptions
										: field.options?.choices?.map((option: FieldOption) => ({
												...option,
												checked: true,
										  })) ?? null,
							}));
						});

						setFilters(
							fields
								.filter((field: { name: string }) =>
									['성별', '나이', '지역', '직업'].includes(field.name)
								)
								.map((field: Field) => ({
									id: field.id,
									name: field.name,
									options: ['singleSelect', 'multipleSelects'].includes(
										field.type
									)
										? field.options && field.options.choices
											? field.options.choices.map((option: FieldOption) => ({
													...option,
													checked: true,
											  }))
											: null
										: field.type === 'number' && field.name === '나이'
										? ageOptions
										: null,
								}))
						);
					}
				}
			} catch (error) {
				console.error('Error fetching base schema:', error);
			}
		};

		getBaseSchema();

		if (records.length > 0) {
			setRecords([]);
		}

		table
			.select({
				view: 'Grid view',
			})
			.eachPage(
				(rows, fetchNextPage) => {
					setRecords(prev => [
						...prev,
						...rows.map(row => ({
							id: row.id,
							...row.fields,
						})),
					]);

					fetchNextPage();
				},
				error => {
					if (error) {
						console.error('Error fetching records:', error);
						return;
					}

					setIsLoading(false);
				}
			);
	}, []);

	useEffect(() => {
		const updatedFilters = filters.flatMap(filter => {
			const filteredOptions = filter.options
				? filter.options.filter(option => !option.checked)
				: [];

			if (filteredOptions.length > 0) {
				return {
					name: filter.name,
					options: filteredOptions,
				};
			} else {
				return [];
			}
		});

		const expressions = updatedFilters.map(filter => {
			const field = filter.name;
			return filter.options
				.map(option => option.name)
				.map(name => `NOT({${field}} = "${name}")`);
		});

		if (expressions.length > 0) {
			const filterByFormula = `AND(${expressions.join(', ')})`;

			if (records.length > 0) {
				setRecords([]);
			}

			setIsLoading(true);

			table
				.select({
					filterByFormula,
				})
				.eachPage(
					(rows, fetchNextPage) => {
						setRecords(prev => [
							...prev,
							...rows.map(row => ({
								id: row.id,
								...row.fields,
							})),
						]);

						fetchNextPage();
					},
					error => {
						if (error) {
							console.error('Error fetching records:', error);
							return;
						}

						setIsLoading(false);
					}
				);
		}
	}, [filters]);

	if (isLoading) {
		return (
			<div className="absolute inset-0 z-[99999] flex flex-col items-center justify-center">
				<Loader2 className="w-12 h-12 mb-2 animate-spin" />
				<p>잠시만 기다려주세요.</p>
			</div>
		);
	}

	return (
		<div className="w-full h-screen">
			<Navbar />
			<div className="flex h-full pt-12 overflow-x-auto min-w-[1280px]">
				<RecordContext.Provider
					value={{
						records,
						setRecords,
						filters,
						setFilters,
						fields,
						setFields,
					}}
				>
					<Sidebar />
					<div className="relative max-h-full overflow-y-auto grow">
						<FilterMenuBar />
						<SurveyOverview />
						<SummaryList />
					</div>
				</RecordContext.Provider>
			</div>
			{isLoading && (
				<div className="absolute inset-0 z-[99999] flex items-center justify-center bg-black/20">
					<div className="flex flex-col items-center px-12 py-6 bg-white rounded-lg shadow-sm gap-y-2">
						<Loader2 className="w-12 h-12 animate-spin" />
						<p>잠시만 기다려주세요.</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
