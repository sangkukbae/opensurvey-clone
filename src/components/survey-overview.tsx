import { BarChart2, ClipboardList, User } from 'lucide-react';
import { Separator } from './ui/separator';
import { useContext } from 'react';
import { RecordContext } from '@/App';

export const SurveyOverview = () => {
	const { fields, records } = useContext(RecordContext);

	const overviews = [
		{
			icon: <User className="w-12 h-12" />,
			name: '유효 응답수',
			value: `${records?.length?.toLocaleString() || 0}명`,
		},
		{
			icon: <ClipboardList className="w-12 h-12" />,
			name: '문항 수',
			value: `${
				fields?.filter(field => field.category === 'question').length || 0
			}개`,
		},
		{
			icon: <BarChart2 className="w-12 h-12" />,
			name: '표본 오차',
			value: '±2.03%p',
		},
	];

	return (
		<div className="p-6 space-y-2">
			<h2 className="font-semibold">설문 개요</h2>
			<div className="flex justify-around items-center w-full h-[250px] rounded-lg border shadow-sm">
				<div className="flex justify-around basis-2/5">
					{overviews.map((overview, index) => (
						<SurveyOverviewItem key={index} {...overview} />
					))}
				</div>
				<Separator orientation="vertical" />
				<ul className="space-y-4 basis-2/5 ">
					<li>
						<span className="font-semibold">데이터 수집 방법</span>
						<p>
							오픈서베이 패널 (모바일 애플리케이션을 통한 응답 수집)
							<br />* 오픈서베이는 표집 상의 비율 할당 여부에 따라 단순임의추출
							또는 층화임의추출 방식을 활용합니다.
						</p>
					</li>
					<li>
						<span className="font-semibold">응답 기간</span>
						<p>2020.08.06(목) 18:29:48 ~ 2020.08.10(월) 19:28:55</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

interface SurveyOverviewItemProps {
	icon: React.ReactNode;
	name: string;
	value: string;
}

const SurveyOverviewItem = ({ icon, name, value }: SurveyOverviewItemProps) => {
	return (
		<div className="h-[124px] flex flex-col justify-center items-center gap-y-2">
			{icon}
			<span className="text-sm">{name}</span>
			<span className="text-2xl font-semibold">{value}</span>
		</div>
	);
};
