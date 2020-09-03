import {useEffect} from 'react';

export default function GoogleTagManager() {
	const ID = process.env.GOOGLE_TAG_MANAGER_ID;

	useEffect(() => {
		if (ID) {
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					'gtm.start':
						new Date().getTime(), event: 'gtm.js'
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src =
					'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', ID);
		}
	}, []);// eslint-disable-line

	if (!ID)
		return (null);

	return (
		<noscript>
			<iframe src={`https://www.googletagmanager.com/ns.html?id=${ID}`}
							height="0"
							width="0"
							style={{display: 'none', visibility: 'hidden'}}
			></iframe>
		</noscript>
	);
}