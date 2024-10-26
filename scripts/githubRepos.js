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
		const cacheData = {
			timestamp: Date.now(),
			repos: repos
		};
		localStorage.setItem(gitHubReposCacheKey, JSON.stringify(cacheData));
		return repos;
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

async function renderGithubRepos() {
	try {
		// Check if repos are already in local storage
		const cachedData = localStorage.getItem(gitHubReposCacheKey);
		const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

		let repos;
		if (cachedData) {
			const parsedData = JSON.parse(cachedData);
			if (Date.now() - parsedData.timestamp < cacheDuration) {
				repos = parsedData.repos;
			} else {
				repos = await fetchGithubRepos();
			}
		} else {
			repos = await fetchGithubRepos();
		}

		const projectsDiv = document.getElementById('projects-container');
		if (!projectsDiv) {
			console.error('projects-container element not found');
			return;
		}
		projectsDiv.innerHTML = '';
		repos.forEach(repo => {
			projectsDiv.appendChild(createRepoDiv(repo));
		});
	} catch (error) {
		console.error('Error rendering GitHub repositories:', error);
	}
}