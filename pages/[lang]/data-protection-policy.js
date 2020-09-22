import {useAppData} from '../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import MainLayout from '../../layouts/Main';
import {dataProtectionPolicyPropType} from '../../propTypes/data-protection-policy';
import {menusPropType} from '../../propTypes/menu';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {fetchStaticPaths, fetchDataProtectionPolicyPage} from '../../lib/services/dataProtectionPolicyPage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import CoverNarrow from '../../components/covers/CoverNarrow';
import ResolvedHtmlField from '../../components/ResolvedHtmlField';
import TopNarrowSection from '../../components/covers/TopNarrowSection';

export default function dataProtectionPolicyPage({dataProtectionPolicyPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	return (
		<>
			<Head>
				{!_isEmpty(dataProtectionPolicyPage.seo_title) &&
				<title>{dataProtectionPolicyPage.seo_title}</title>
				}
				{!_isEmpty(dataProtectionPolicyPage.seo_meta_description) &&
				<meta name={'Description'} content={dataProtectionPolicyPage.seo_meta_description} />
				}
			</Head>
			<MainLayout isWhite={true}>
				<TopNarrowSection title={dataProtectionPolicyPage.title}
													subTitle={dataProtectionPolicyPage.subtitle}
													className={'for-job-page'}
				/>
				<section className={'job-position-text'}>
					<div className="container">
						<div className="rich-text">
				<ResolvedHtmlField content={dataProtectionPolicyPage.full_description} />
						</div>
					</div>
				</section>

			</MainLayout>
		</>
	);
}

dataProtectionPolicyPage.propTypes = {
	dataProtectionPolicyPage: dataProtectionPolicyPropType().isRequired,
	menus: menusPropType().isRequired,
	textLabels: textLabelsPropType().isRequired,
};

export async function getStaticProps(context) {
	const dataProtectionPolicyPage = await fetchDataProtectionPolicyPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			dataProtectionPolicyPage,
			menus,
			textLabels
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: await fetchStaticPaths(),
		fallback: false
	};
}