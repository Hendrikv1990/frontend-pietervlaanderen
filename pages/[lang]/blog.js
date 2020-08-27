import {useAppData} from '../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import MainLayout from '../../layouts/Main';
import {blogPagePropType} from '../../propTypes/blogPage';
import {menusPropType} from '../../propTypes/menu';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {fetchBlogPage, fetchStaticPaths} from '../../lib/services/blogPage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import {fetchAllBlogPosts} from '../../lib/services/blogPost';
import {blogPostsPropType} from '../../propTypes/blogPost';
import AsText from '../../components/AsText';
import BlogPosts from '../../components/lists/BlogPosts';
import SubscriptionForm from '../../components/pages/contacts/SubscriptionForm';

export default function BlogPage({blogPage, blogPosts, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	return (
		<>
			<Head>
				{!_isEmpty(blogPage.seo_title) &&
				<title>{blogPage.seo_title}</title>
				}
				{!_isEmpty(blogPage.seo_meta_description) &&
				<meta name={'Description'} content={blogPage.seo_meta_description} />
				}
			</Head>
			<MainLayout isWhite={true}>
				<section className="top-narrow">
					<div className="container">
						<h1 className="top-narrow__title">
							<AsText value={blogPage.title} />
						</h1>
						<div className="top-narrow__subtitle top-narrow__subtitle_roundhand">
							<AsText value={blogPage.sub_title} />
						</div>
					</div>
				</section>
				<BlogPosts blogPosts={blogPosts} />
				<SubscriptionForm />
			</MainLayout>
		</>
	);
}

BlogPage.propTypes = {
	blogPage: blogPagePropType().isRequired,
	blogPosts: blogPostsPropType().isRequired,
	menus: menusPropType().isRequired,
	textLabels: textLabelsPropType().isRequired,
};

export async function getStaticProps(context) {
	const blogPage = await fetchBlogPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);
	const blogPosts = await fetchAllBlogPosts(context);

	return {
		props: {
			blogPage,
			blogPosts,
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