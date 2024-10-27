import { homePage } from './page_home.js';
import { blogPage } from './page_blog.js';
import { careerPage } from './page_career.js';

export async function loadPage(name) {
	try {
		let main = document.getElementById('main');
		if (!main) {
			console.error(`"main" element not found`);
			return;
		}
		main.innerHTML = '';
		switch (name) {
			case 'blog':
				main.innerHTML = blogPage();
				break;
			case 'career':
				main.innerHTML = careerPage();
				break;
			default:
				main.innerHTML = homePage();
				break;
		}
	} catch (error) {
		console.error(`Error loading page: "${name}"`, error);
	}
}