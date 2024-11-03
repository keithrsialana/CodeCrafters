const User = (props: any) => {
	const { user } = props;
	return (
		<div className="card bg-black text-white pt-3" style={{maxWidth:"100%",}}>
			<img
				src={user.avatar_url}
				className="card-img-top"
				alt="Pick user card"
			/>
			<div className="card-body">
				<h5 className="card-title">
					{user.name}{" "}
					<a href={user.html_url}>[{user.login}]</a>
				</h5>
				<div className="row">
					<div className="col fw-bold">Location:</div>
					<div className="col">{user.location?user.location:"No location found"}</div>
				</div>
				<div className="row">
					<div className="col fw-bold">Email:</div>
					<div className="col">
						<a href={user.email}>{user.email?user.email:"No email found"}</a>
					</div>
				</div>
				<div className="row">
					<div className="col fw-bold">Followers:</div>
					<div className="col">
						<a href={user.followers_url}>{user.followers}</a>
					</div>
				</div>
				<div className="row">
					<div className="col fw-bold">Company:</div>
					<div className="col">
						{user.company ? user.company : "No company found"}
					</div>
				</div>
				<p className="card-text">{user.bio ? user.bio : "No bio found"}</p>
			</div>
		</div>
	);
};

export default User;
