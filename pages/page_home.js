
const repoList = document.createElement('div');
repoList.id = 'repo-list';
const repos = await loadGithubRepos()
repos.forEach(repo => {
	repoList.appendChild(createRepoDiv(repo));
});
async function homePage() {
	return `<h2>Projects</h2>
		${repoList.outerHTML}`;
}
