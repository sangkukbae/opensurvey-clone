import Airtable from 'airtable';
import axios from 'axios';

Airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
});

const base = Airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export const table = base('SHEET1');

export const axiosInstance = axios.create({
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
	},
});
