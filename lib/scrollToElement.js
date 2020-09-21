export function scrollToElement(querySelector) {
	const $el = document.querySelector(querySelector);
	const main = document.querySelector('.yacht-page, .home-page')

	if (!$el)
		return false;

	main.scrollTo({
		top: $el.getBoundingClientRect().top + window.scrollY,
		behavior: 'smooth'
	});
}

export function scrollToSection(sectionIndex) {
	return scrollToElement(`#section-key-${sectionIndex}`);
}