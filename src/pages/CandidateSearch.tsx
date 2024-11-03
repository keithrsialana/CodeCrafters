import { useEffect, useState } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { useContext } from "react";
import User from "../components/User";
import Candidate from "../interfaces/Candidate.interface";
import CandidateContext from "../context/SavedContext";

const CandidateSearch: React.FC = () => {
	// the user that is going to be displayed on the page
	const [user, setUser] = useState<Candidate>({} as Candidate);

	// context setup
	const context = useContext(CandidateContext);
	if (!context) {
		throw new Error("CandidateList must be used within a CandidateProvider");
	}
	const { candidates, setCandidates } = context;

	// runs one time
	useEffect(() => {
		if (!user.id) getNewUser();
	});

	//every time candidates gets set, update localStorage
	useEffect(() => {
		const storage: string | null = localStorage.getItem("users");
		if (storage) {
			const storageArray = JSON.parse(storage);
			// if users exist in localStorage, reset candidates
			if (storageArray.length === 0 && candidates.length > 0)
				localStorage.setItem("users", JSON.stringify(candidates));
			else if (storageArray.length > 0 && candidates.length === 0)
				setCandidates(storageArray as Candidate[]);
			else localStorage.setItem("users", JSON.stringify(candidates));
		} else if (!storage && candidates.length > 0) {
			localStorage.setItem("users", JSON.stringify(candidates));
		}
	}, [candidates]);

	async function handleAccept() {
		// adds the accepted user to the candidate list context
		await setCandidates([...candidates, user]);
		await getNewUser();
	}
	async function handleDeny() {
		await getNewUser();
	}
	async function getNewUser() {
		// gets a list of users from github
		const userList = await searchGithub();

		// picks a random user from the list
		let pickedUser =
			userList[Math.floor(Math.random() * userList.length - 1) - 1];
		if (!pickedUser) {
			getNewUser();
			return;
		}
		// searches for that user
		let gitUser = await searchGithubUser(pickedUser.login);

		// checks if the API request found a user
		if (gitUser.type == undefined || gitUser == ({} as any)) {
			getNewUser();
			return;
		} else {
			// if the user is found, set it to the new user
			await setUser(gitUser);
		}
	}
	return (
		<div className="text-center" style={{ maxWidth: "60%" }}>
			<h1>CandidateSearch</h1>
			<div className="row justify-content-center text-start">
				<User user={user} />
			</div>
			<div className="container-fluid text-center justify-content-center">
				<div className="row">
					<div className="deny-button col" onClick={handleDeny}>
						Deny
					</div>
					<div className="accept-button col" onClick={handleAccept}>
						Accept
					</div>
				</div>
			</div>
		</div>
	);
};

export default CandidateSearch;
