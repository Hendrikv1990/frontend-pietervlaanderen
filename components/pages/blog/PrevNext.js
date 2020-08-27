import {blogPostPropType, blogPostsPropType} from '../../../propTypes/blogPost';
import NextLink from 'next/link';
import {useTranslation} from '../../Locale';
import {useTextLabels} from '../../../hooks/appData';
import AsText from '../../AsText';

export default function BlogPagePrevNext({blogPostPage, blogPosts}) {
	const {locale} = useTranslation();
	const {textLabels} = useTextLabels();
	const currentIndex = blogPosts.findIndex(({_meta}) => _meta.uid === blogPostPage._meta.uid);

	// let prevIndex, nextIndex;
	const prevIndex = (currentIndex > 0) ? currentIndex - 1 : false;
	const nextIndex = (currentIndex + 1 < blogPosts.length) ? currentIndex + 1 : false;

	return (
		<section className="section section_more-articles">
			<div className="container">
				<h4 className="h4 show_sm">Read more</h4>
				<div className="flex flex_sb_fs">
					{prevIndex !== false &&
					<NextLink href='/[lang]/blog/[slug]' as={`/${locale}/blog/${blogPosts[prevIndex]._meta.uid}`}>
						<a className="read-more read-more_prev">
							<span className="read-more__dir read-more__dir_prev">{textLabels.previous_article}</span>
							<span className="read-more__name">
								<AsText value={blogPosts[prevIndex].title} />
							</span>
						</a>
					</NextLink>
					}
					{nextIndex !== false &&
					<NextLink href='/[lang]/blog/[slug]' as={`/${locale}/blog/${blogPosts[nextIndex]._meta.uid}`}>
						<a className="read-more read-more_next">
							<span className="read-more__dir read-more__dir_next">{textLabels.next_article}</span>
							<span className="read-more__name">
								<AsText value={blogPosts[nextIndex].title} />
							</span>
						</a>
					</NextLink>
					}
				</div>
			</div>
		</section>
	);
}

BlogPagePrevNext.propTypes = {
	blogPostPage: blogPostPropType().isRequired,
	blogPosts: blogPostsPropType().isRequired
};