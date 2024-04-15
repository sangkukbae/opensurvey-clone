export interface Record {
	id: string;
	[key: string]: unknown; // Since we don't know the structure of your Airtable records, this is kept generic
}

export interface FilterItem {
	id: string;
	name: string;
	options: FilterItemOption[] | null;
}

export interface FilterItemOption {
	id: string;
	name: string;
	color: string;
	checked: boolean;
}

interface Table {
	id: string;
	name: string;
	primaryField: string;
	fields: Field[];
	views: View[];
}

interface View {
	id: string;
	name: string;
	type: string;
}

export interface Field {
	id: string;
	name: string;
	type: string;
	text: string;
	category: string;
	options:
		| { id: string; name: string; color: string; checked: boolean }[]
		| null;
}

export interface Option {
	['precision']?: number;
	['choices']?: Choice[];
}

export interface Choice {
	id: string;
	name: string;
	color: string;
}

export interface BaseSchema {
	tables: Table[];
}

export const OptionType = {
	SingleSelect: 'singleSelect',
	MultipleSelects: 'multipleSelects',
	Number: 'number',
} as const;
