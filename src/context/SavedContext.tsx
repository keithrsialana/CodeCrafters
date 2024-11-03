// context/MyContext.js
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";
import { ReactNode } from "react";

interface CandidateContextType {
	candidates: Candidate[];
	setCandidates: Dispatch<SetStateAction<Candidate[]>>;
}

const CandidateContext = createContext<CandidateContextType | undefined>(
	undefined
);

interface CandidateProviderProps {
	children: ReactNode;
}

export const CandidateProvider: React.FC<CandidateProviderProps> = ({
	children,
}) => {
	const [candidates, setCandidates] = useState<Candidate[]>([]);

	return (
		<CandidateContext.Provider value={{ candidates, setCandidates }}>
			{children}
		</CandidateContext.Provider>
	);
};

export default CandidateContext;
