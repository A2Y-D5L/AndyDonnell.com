import { createRepoDiv, loadGithubRepos } from '../github/repos.js';

export let repos = [];
export async function homePage() {
	const repoList = document.createElement('div');
	repoList.id = 'repo-list';
	if (!repos.length) {
		repos = await loadGithubRepos();
	}
	repos.forEach(repo => {
		repoList.appendChild(createRepoDiv(repo));
	});
	return `<h2>Projects</h2>
		${repoList.outerHTML}`;
}
