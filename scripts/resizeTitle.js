function adjustTitleSize() {
    const pageTitle = document.querySelector('.page-title');
    const header = document.querySelector('header');
    let headerWidth = header.offsetWidth;
    let fontSize = Math.min(40, headerWidth / 10);

    pageTitle.style.fontSize = `${fontSize}px`;
}

window.addEventListener('resize', adjustTitleSize);
document.addEventListener('DOMContentLoaded', adjustTitleSize);