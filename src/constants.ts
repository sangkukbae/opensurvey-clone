export const ageOptions = [
	{
		id: 'age_10_14',
		name: '10~14세',
		color: 'blueLight2',
		checked: true,
	},
	{
		id: 'age_15_19',
		name: '15~19세',
		color: 'tealLight2',
		checked: true,
	},
	{
		id: 'age_20_24',
		name: '20~24세',
		color: 'greenLight2',
		checked: true,
	},
	{
		id: 'age_25_29',
		name: '25~29세',
		color: 'yellowLight2',
		checked: true,
	},
	{
		id: 'age_30_34',
		name: '30~34세',
		color: 'orangeLight2',
		checked: true,
	},
	{
		id: 'age_35_39',
		name: '35~39세',
		color: 'redLight2',
		checked: true,
	},
	{
		id: 'age_40_44',
		name: '40~44세',
		color: 'pinkLight2',
		checked: true,
	},
	{
		id: 'age_45_49',
		name: '45~49세',
		color: 'purpleLight2',
		checked: true,
	},
	{
		id: 'age_50_54',
		name: '50~54세',
		color: 'grayLight2',
		checked: true,
	},
	{
		id: 'age_55_59',
		name: '55~59세',
		color: 'blueLight1',
		checked: true,
	},
	{
		id: 'age_60_up',
		name: '60세 이상',
		color: 'cyanLight1',
		checked: true,
	},
	// eslint-disable-next-line no-mixed-spaces-and-tabs
];

export const colorList = [
	'#2469ff',
	'#6b9aff',
	'#8fb2ff',
	'#ccdbff',
	'#e4e6ec',
	'#bec4d0',
	'#959eb2',
	'#6a7894',
];

export const questionMapToKind: Record<string, string> = {
	1: '주관식 숫자',
	2: '객관식 단일',
	3: '객관식 단일',
	4: '객관식 단일',
	5: '객관식 단일',
	6: '주관식 서술',
	7: '객관식 중복',
	8: '객관식 순위',
	9: '객관식 순위',
	10: '객관식 단일',
	11: '평가형 5점',
	12: '평가형 5점',
	13: '평가형 5점',
	14: '평가형 NPS',
	15: '주관식 숫자',
	16: '객관식 순위',
	17: '주관식 서술',
	18: '객관식 순위',
	19: '주관식 서술',
	20: '주관식 숫자',
};
