export function scrollToElement(querySelector) {
	const $el = document.querySelector(querySelector);
	if (!$el)
		return false;

	window.scrollTo({
		top: $el.getBoundingClientRect().top + window.scrollY,
		behavior: 'smooth'
	});
}

export function scrollToSection(sectionIndex) {
	return scrollToElement(`#section-key-${sectionIndex}`);
}