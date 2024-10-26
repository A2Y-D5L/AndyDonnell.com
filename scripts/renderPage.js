
async function renderPage(pageName) {
    try {

        const response = await fetch(`../pages/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
        const content = await response.text();
        document.getElementById('selected-page').innerHTML = content;
    } catch (error) {
        console.error('Error fetching page:', error);
    }
}