const gitHubReposCacheKey = 'a2yd5lGithubReposCache';
const githubAPIReposURL = 'https://api.github.com/users/a2y-d5l/repos';

async function fetchGithubRepos() {
	try {
		const response = await fetch(githubAPIReposURL);
		if (!response.ok) {
			throw new Error(`Request failed: ${response.status} ${response.statusText}`);
		}
		const repos = await response.json();
		// Store the fetched repos and timestamp in local storage
		localStorage.setItem(gitHubReposCacheKey, JSON.stringify({
			timestamp: Date.now(),
			repos: repos
		}));
		return repos;
	} catch (error) {
		console.error('Error fetching GitHub repositories:', error);
		return [];
	}
}
async function loadGithubRepos() {
	try {
		const cachedData = localStorage.getItem(gitHubReposCacheKey);
		const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
		if (cachedData) {
			const parsedData = JSON.parse(cachedData);
			if (Date.now() - parsedData.timestamp > cacheDuration) {
				return await fetchGithubRepos();
			}
			return parsedData.repos;
		}
		return await fetchGithubRepos();
	} catch (error) {
		console.error('Error fetching GitHub repositories:', error);
		return [];
	}
}


function createRepoDiv(repo) {
	const repoElement = document.createElement('div');
	repoElement.className = 'repo';
	repoElement.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || 'No description available'}</p>
        <p>Language: ${repo.language || 'Unknown'}</p>
    `;
	return repoElement;
}
