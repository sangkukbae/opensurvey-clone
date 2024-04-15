import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { ArrowDownToLine, Forward } from 'lucide-react';

export const Navbar = () => {
	return (
		<nav className="fixed top-0 left-0 flex items-center justify-between w-full h-12 px-6 bg-white border-b shadow-sm">
			<div className="space-x-2">
				<a
					className={cn(buttonVariants({ variant: 'link' }), 'text-base')}
					href="/#"
				>
					결과 요약
				</a>
				<a
					className={cn(buttonVariants({ variant: 'link' }), 'text-base')}
					href="/#"
				>
					교차 분석
				</a>
			</div>
			<div className="space-x-2">
				<Button>
					<ArrowDownToLine className="w-4 h-4 mr-2" />
					<span>다운로드</span>
				</Button>

				<Button>
					<Forward className="w-4 h-4 mr-2" />
					<span>공유</span>
				</Button>
			</div>
		</nav>
	);
};
