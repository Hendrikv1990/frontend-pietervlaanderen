
export const pageview = (url) => {
	window.gtag('config', ga.getAll()[0].get('trackingId'), {
		page_path: url,
	})
}

export const event = ({ action, category, label, value }) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value
	})
}