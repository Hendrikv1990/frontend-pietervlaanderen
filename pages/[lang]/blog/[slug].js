import {useAppData} from '../../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import MainLayout from '../../../layouts/Main';
import {fetchStaticPaths, fetchBlogPostByUID, fetchAllBlogPosts} from '../../../lib/services/blogPost';
import {fetchLayoutData} from '../../../lib/services/layoutData';
import {blogPostPropType, blogPostsPropType} from '../../../propTypes/blogPost';
import {textLabelsPropType} from '../../../propTypes/textLabels';
import {menusPropType} from '../../../propTypes/menu';
import {RichText} from 'prismic-reactjs';
import AsText from '../../../components/AsText';
import ResolvedHtmlField from '../../../components/ResolvedHtmlField';
import EnjoyResponsibleBoatingShort from '../../../components/pages/blog/EnjoyResponsibleBoatingShort';
import BlogPagePrevNext from '../../../components/pages/blog/PrevNext';
import SubscriptionForm from '../../../components/pages/contacts/SubscriptionForm';
import Footer from '../../../components/Footer';

export default function BlogPostPage({blogPostPage, blogPosts, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	return (
		<>
			<Head>
				<title>{blogPostPage.seo_title || RichText.asText(blogPostPage.title)}</title>
				{!_isEmpty(blogPostPage.seo_meta_description) &&
				<meta name={'Description'} content={blogPostPage.seo_meta_description} />
				}
			</Head>
			<MainLayout isWhite={true}>
				<section className="section section_article">
					<div className="section_bg_gradient"></div>
					<div className="container">
						<div className="rich-text">
							<h1 className="top-narrow__title">
								<AsText value={blogPostPage.title} />
							</h1>
							<ResolvedHtmlField content={blogPostPage.full_text} />
						</div>
					</div>
				</section>
				<EnjoyResponsibleBoatingShort />
				<BlogPagePrevNext blogPosts={blogPosts} blogPostPage={blogPostPage} />
				<SubscriptionForm />
				<Footer />
			</MainLayout>
		</>
	);
}

BlogPostPage.propTypes = {
	blogPostPage: blogPostPropType().isRequired,
	blogPosts: blogPostsPropType().isRequired,
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired
};

export async function getStaticProps(context) {
	const blogPostPage = await fetchBlogPostByUID(context.params.slug, context);
	const blogPosts = await fetchAllBlogPosts(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			blogPostPage,
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