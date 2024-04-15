import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { QuestionSearch } from './question-search';
import { QuestionSelector } from './question-selector';
import { UserPropertySelector } from './user-property-selector';

interface SidebarContextType {
	selectedQuestions: string[];
	setSelectedQuestions: Dispatch<SetStateAction<string[]>>;
}

export const SidebarContext = createContext<SidebarContextType>({
	selectedQuestions: [],
	setSelectedQuestions: () => {},
});

export const Sidebar = () => {
	const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
	return (
		<aside className="basis-[300px] max-h-full border-r p-6 space-y-4 overflow-y-auto">
			<SidebarContext.Provider
				value={{ selectedQuestions, setSelectedQuestions }}
			>
				<QuestionSearch />
				<UserPropertySelector />
				<QuestionSelector />
			</SidebarContext.Provider>
		</aside>
	);
};
