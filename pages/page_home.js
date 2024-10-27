let repos = [];
async function homePage() {
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
