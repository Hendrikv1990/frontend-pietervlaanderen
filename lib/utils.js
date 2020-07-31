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