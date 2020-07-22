import MainLayout from '../../layouts/Main';
import {locales} from '../../prismic-configuration';
import {Client} from '../../lib/prismicHelpers';
import {RichText} from 'prismic-reactjs';
import {serializeHyperlink} from '../../lib/prismicHelpers';
import {useTranslation} from '../../components/Locale';

export default function Index({document}) {
	const {t} = useTranslation();

	if (!document)
		return;

	return (
		<MainLayout>
			<main data-wio-id={document.id}>
				<b>Phrase from i18n:</b> {t('some')}
				<img src={document.data.image.url} className={'intro-img'} />
				<RichText
					render={document.data.title}
					serializeHyperlink={serializeHyperlink}
				/>
				<RichText
					render={document.data.description}
					serializeHyperlink={serializeHyperlink}
				/>
			</main>
		</MainLayout>
	);
}

export async function getStaticProps(context) {
	const { ref } = context.previewData ? context.previewData : {};
	const client = Client();
	const options = {
		lang: locales[context.params.lang].prismicLocale
	};

	if (ref) {
		options.ref = ref;
	}

	const document = await client.getByUID('page', 'homepage', options);

	return {
		props: {
			document
		}
	};
}

export function getStaticPaths() {
	return {
		paths: [
			{ params: { lang: 'en' } },
			{ params: { lang: 'ru' } },
		],
		fallback: false
	};
}