import { useContext, useEffect } from "react";
import CandidateContext from "../context/SavedContext";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
	// context setup
	const context = useContext(CandidateContext);
	if (!context) {
		throw new Error("CandidateList must be used within a CandidateProvider");
	}
	const { candidates, setCandidates } = context;

	//every time candidates gets set, update localStorage
	useEffect(() => {
		const storage: string | null = localStorage.getItem("users");
		if (storage) {
			const storageArray = JSON.parse(storage);
			// if users exist in candidates, reset localStorage
			if (storageArray.length === 0 && candidates.length > 0)
				localStorage.setItem("users", JSON.stringify(candidates));
			// if users exist in localStorage, reset candidates
			else if (storageArray.length > 0 && candidates.length === 0)
				setCandidates(storageArray as Candidate[]);
			else localStorage.setItem("users", JSON.stringify(candidates));
		} else if (!storage && candidates.length > 0) {
			localStorage.setItem("users", JSON.stringify(candidates));
		}
	}, [candidates]);

	async function handleReject(user: Candidate) {
		let newList: Candidate[] = [] as Candidate[];
    // if there's more than one person in candidates, subtract
		if (candidates.length > 1) {
			newList = candidates.filter(
				(userObj: Candidate) => userObj.id !== user.id
			);
      setCandidates(newList);
		} else {
      // if there's only 1, empty the list and clear localStorage
      setCandidates([] as Candidate[]);
      localStorage.removeItem('users');
    }
	}
	return (
		<div className="text-center text-white">
			<h1>Potential Candidates</h1>
			{candidates.length > 0 ? (
				<table className="table table-dark table-striped container">
					<thead>
						<tr>
							<th scope="col">Image</th>
							<th scope="col">Name</th>
							<th scope="col">Location</th>
							<th scope="col">Email</th>
							<th scope="col">Company</th>
							<th scope="col">Bio</th>
							<th scope="col">Reject</th>
						</tr>
					</thead>
					<tbody>
						{candidates.map((user) => {
							return (
								<tr>
									<td>
										<a href={user.html_url}>
											<img
												src={user.avatar_url}
												alt={`${user.login} profile picture`}
												style={{ maxWidth: "40%" }}
											/>
										</a>
									</td>
									<td>
										<a href={user.html_url}>{`${user.name ? user.name : ""} [${
											user.login
										}]`}</a>
									</td>
									<td>{user.location}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>{user.company}</td>
									<td>{user.bio}</td>
									<td>
										<button
											className="rejectButton"
											onClick={() => handleReject(user)}
										>
											-
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<h2>There are no candidates in the saved list!</h2>
			)}
		</div>
	);
};

export default SavedCandidates;
