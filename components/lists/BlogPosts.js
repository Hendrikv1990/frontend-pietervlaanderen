import {blogPostsPropType} from '../../propTypes/blogPost';
import PropTypes from 'prop-types';
import {useState} from 'react';
import NextLink from 'next/link';
import {useTranslation} from '../Locale';
import AsText from '../AsText';
import ResolvedHtmlField from '../ResolvedHtmlField';
import dayjs from 'dayjs';
import {useTextLabels} from '../../hooks/appData';

export default function BlogPosts({blogPosts, limit}) {
	const {locale} = useTranslation();
	const {textLabels} = useTextLabels();
	// const [visiblePosts, setVisiblePosts] = useState([]);
	const [visiblePages, setVisiblePages] = useState(1);

	const visiblePosts = getVisiblePostsByPages(blogPosts, limit, visiblePages);

	return (
		<section className="section section_articles-list">
			<div className="container">
				<div className="articles-list flex flex_fs_s flex_wrap">
					{visiblePosts.map((post, i) => (
						<NextLink key={i} href='/[lang]/blog/[slug]' as={`/${locale}/blog/${post._meta.uid}`}>
							<a className="articles-list__item articles-list-item">
								<div className="flex flex_column flex_fs_s articles-list-item__wrapper">
									<div className="articles-list-item__img-block">
										<img src={post.image.xs.url}
												 alt={post.image.alt}
												 className="articles-list-item__img"
										/>
									</div>
									<div className="articles-list-item__info flex flex_wrap flex_column flex_md_row">
										<h4 className="articles-list-item__title">
											<AsText value={post.title} />
										</h4>
										<div className="articles-list-item__text no-last-margin">
											<ResolvedHtmlField content={post.short_text} />
										</div>
										<div className="articles-list-item__date">{dayjs(post.date).format('D MMMM YYYY')}</div>
									</div>
									<div className="articles-list-item__btn-more">
										<span className="btn btn_border_dark">{textLabels.read_more_label}</span>
									</div>
								</div>
							</a>
						</NextLink>
					))}
				</div>
				{blogPosts.length > visiblePosts.length &&
				<div className="section__footer text_center">
					<a href="#"
						 className="btn btn_border_dark"
						 onClick={(e) => {e.preventDefault();setVisiblePages(visiblePages + 1);}}
					>{textLabels.load_more}</a>
				</div>
				}
			</div>
		</section>
	);
}

BlogPosts.propTypes = {
	blogPosts: blogPostsPropType().isRequired,
	limit: PropTypes.number
};

BlogPosts.defaultProps = {
	limit: 6
};

function getVisiblePostsByPages(blogPosts, limit, visiblePages) {
	return blogPosts.slice(0, limit * visiblePages);
}