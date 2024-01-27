async function renderPage(page) {
    try {
        const response = await fetch(`../pages/${page}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        if (page === 'projects') {
            fetch('https://api.github.com/users/a2y-d5l/repos')
                .then(response => response.json())
                .then(data => {
                    const projectsContainer = document.getElementById('projects-container');
                    data.forEach(repo => {
                        const repoElement = document.createElement('div');
                        repoElement.className = 'repo';
                        repoElement.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description available'}</p>
            `;
                        projectsContainer.appendChild(repoElement);
                    });
                })
                .catch(error => console.error('Error fetching GitHub repos:', error));
            projectsLoaded = true;
        }
        document.getElementById('selected-page').innerHTML = content;
    } catch (error) {
        console.error('Error fetching page:', error);
    }
}

function loadProjects() {

}