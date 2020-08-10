import _forEach from 'lodash/forEach';
import _isObject from 'lodash/isObject';

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

export function fieldAttrs(field, values = {}, errors = {}, helperText = '') {
	let error = false;
	if (field in errors && errors[field]) {
		error = true;
		helperText = errors[field][0];
	}

	const out = {
		name: field,
		error,
		value: ''
	};

	if (field in values) {
		out.value = values[field];
	}

	if (helperText)
		out.helperText = helperText;

	return out;
}

export function createGetStr(params, skipRoot = [], prefix = '') {
	const out = [];
	const isArray = Array.isArray(params);

	_forEach(params, (val, key) => {
		if (skipRoot.indexOf(key) !== -1)
			return;

		let name;
		if (prefix !== '') {
			name = (!isArray) ? `${prefix}[${key}]` : `${prefix}[]`;
		} else {
			name = key;
		}

		if (_isObject(val) || Array.isArray(val)) {
			out.push(createGetStr(val, [], name));
		} else {
			if (val === null) {
				val = '';
			}

			val = encodeURIComponent(val);
			out.push(`${name}=${val}`);
		}
	});

	return out.join('&');
}