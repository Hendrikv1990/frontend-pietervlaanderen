export function isLocalstorageSupported() {
	const mod = 'modernizr';

	try {
		localStorage.setItem(mod, mod);
		localStorage.removeItem(mod);
		return true;
	} catch (e) {
		return false;
	}
}

export const getSectionIdByIndex = (index) => `section-key-${index}`;

export function isRichEmpty(richText) {
	if (Array.isArray(richText) && richText.length)
		return false;

	return true;
}

export function getIconsBySlide(slide, positions) {
	const icons = [];
	for (let i = 1; i <= positions; i++) {
		if (slide[`caption_${i}`]?.icon) {
			icons.push({
				icon: slide[`caption_${i}`].icon,
				subtitle: slide[`subtitle_${i}`],
				description: slide[`description_${i}`],
			});
		}
	}

	return icons;
}