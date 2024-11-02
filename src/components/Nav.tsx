import { Link, useLocation } from "react-router-dom";

const Nav = () => {
	// Add necessary code to display the navigation bar and link between the pages
	const currentLocation = useLocation().pathname;
	return (
		<div className="container-fluid w-100">
			<div className="w-100">
				<Link to="/">
					{currentLocation == "/" ? (
						<div className="btn btn-outline-primary active" aria-current="page">
							Candidate Search
						</div>
					) : (
						<div className="btn btn-outline-primary" aria-current="page">
							Candidate Search
						</div>
					)}
				</Link>
				<Link to="/SavedCandidates">
					{currentLocation == "/SavedCandidates" ? (
						<div className="btn btn-outline-primary active" aria-current="page">
							Saved Candidates
						</div>
					) : (
						<div className="btn btn-outline-primary" aria-current="page">
							Saved Candidates
						</div>
					)}
				</Link>
			</div>
		</div>
	);
};

export default Nav;
