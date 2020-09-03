import xmlBuilder from 'xmlbuilder';
import {fetchSitemapData} from '../lib/services/sitemapXml';
import dayjs from 'dayjs';
import {getLocaleByPrismic} from '../lib/i18n';

export default function SiteMapXml() {
	return (
		<></>
	);
}

export async function getServerSideProps({res}) {
	const xmlRoot = xmlBuilder.begin().ele('urlset', {
		xmlns : "http://www.sitemaps.org/schemas/sitemap/0.9"
	})

	const data = await fetchSitemapData();

	//home page
	appendUrl(xmlRoot, `/en`, data.home_page._meta.lastPublicationDate);
	for (const row of data.home_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}`
		);
	}

	//about page
	appendUrl(xmlRoot, `/en/about`, data.about_page._meta.lastPublicationDate);
	for (const row of data.about_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/about`
		);
	}

	//blog page
	appendUrl(xmlRoot, `/en/blog`);
	for (const row of data.blog_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/blog`
		);
	}

	//blog articles
	for (const {node} of data.allBlog_posts.edges) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(node._meta.lang)}/blog/${node._meta.uid}`,
			node._meta.lastPublicationDate
		);
	}

	//charter page
	appendUrl(xmlRoot, `/en/charter`);
	for (const row of data.charters_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/charter`
		);
	}

	//contacts page
	appendUrl(xmlRoot, `/en/contacts`, data.contact_page._meta.lastPublicationDate);
	for (const row of data.contact_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/contacts`
		);
	}

	//dealers page
	appendUrl(xmlRoot, `/en/dealers`, data.dealers_page._meta.lastPublicationDate);
	for (const row of data.dealers_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/dealers`
		);
	}

	//jobs page
	appendUrl(xmlRoot, `/en/jobs`, data.jobs_page._meta.lastPublicationDate);
	for (const row of data.jobs_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/jobs`
		);
	}

	//job position page
	for (const {node} of data.allJob_position_pages.edges) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(node._meta.lang)}/jobs/${node._meta.uid}`,
			node._meta.lastPublicationDate
		);
	}

	//propulsion page
	appendUrl(xmlRoot, `/en/propulsion`, data.propulsion._meta.lastPublicationDate);
	for (const row of data.propulsion._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/propulsion`
		);
	}

	//propulsion page
	appendUrl(xmlRoot, `/en/solar`, data.solar_page._meta.lastPublicationDate);
	for (const row of data.solar_page._meta.alternateLanguages) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(row.lang)}/solar`
		);
	}

	//yachts
	for (const {node} of data.allYachts.edges) {
		appendUrl(
			xmlRoot,
			`/${getLocaleByPrismic(node._meta.lang)}/yacht/${node._meta.uid}`,
			node._meta.lastPublicationDate
		);
	}

	xmlRoot.end({pretty: true});

	// getLocaleByPrismic(node._meta.lang)
	res.setHeader('Content-Type', 'text/xml');
	res.write(`<?xml version="1.0"?>${xmlRoot.toString()}`);
	res.end();

	return {
		props: {}
	};
}

function appendUrl(xmlParent, url, lastModified = null) {
	const xmlUrl = xmlParent.ele('url');
	xmlUrl.ele('loc', `${process.env.SITEMAP_URL_PREFIX}${url}`);

	if (lastModified) {
		xmlUrl.ele('lastmod', dayjs(lastModified).format('YYYY-MM-DD'));
	}
}