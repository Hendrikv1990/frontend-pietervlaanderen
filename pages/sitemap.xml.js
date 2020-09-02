export default function SiteMapXml() {
	return (
		<></>
	);
}

export async function getServerSideProps({res}) {
	res.setHeader('Content-Type', 'text/xml');
	res.write(`<?xml version="1.0" encoding="UTF-8"?><test>:)</test>`);
	res.end();

	return {
		props: {}
	};
}