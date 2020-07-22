const REPOSITORY_NAME = process.env.PRISMIC_REPOSITORY_NAME;

export default function PrismicScript() {
	return (
		<script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${REPOSITORY_NAME}&new=true`} />
	);
}