// Create an interface for the Candidate objects returned by the API
export default interface Candidate {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	user_view_type: string;
	site_admin: boolean;
	name: string | undefined;
	company: string | undefined;
	blog: string;
	location: string | undefined;
	email: string | undefined;
	hireable: any;
	bio: string | undefined;
	twitter_username: string | undefined;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}
