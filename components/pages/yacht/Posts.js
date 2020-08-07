import {yachtPagePropType} from '../../../propTypes/yacht';
import {useTextLabels} from '../../../hooks/appData';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import AsText from '../../AsText';
import ResolvedLink from '../../ResolvedLink';

export default function YachtPosts({yacht, blockIndex}) {
	const {textLabels} = useTextLabels();

	const posts = yacht.press_tests_group.map((item) => ({
		img: item.press_test_img,
		link: item.press_test_link,
		title: item.press_test_title,
		date: item.press_test_date,
		short_description: item.press_test_announce
	}));

	return (
		<section className="section"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
						 data-section-color={'black'}
		>
			<div className="container">
				<div className="section__header">
					<div className="h2">{textLabels.press_tests_label}</div>
				</div>
				<div className="section__body">
					<div className="press-tests">
						{posts.map((item, i) => {
							return (
								<div key={i}
										 className="press-tests__item flex flex_fs_s"
								>
									<div className="col_6">
										<div className="press-tests__img-cover">
											<ResolvedLink link={item.link}>
												<img src={item.img.url}
														 alt={item.img.alt}
														 className="press-tests__img"
												/>
											</ResolvedLink>
										</div>
									</div>
									<div className="col_6">
										<div className="press-tests__info flex flex_column flex_c_fs">
											<div className="press-tests__date">{dayjs(item.date).format('D MMMM YYYY')}</div>
											<h3 className="press-tests__title">
												<ResolvedLink link={item.link}>
													<AsText value={item.title} />
												</ResolvedLink>
											</h3>
											<div className="press-tests__descr">
												<ResolvedHtmlField content={item.short_description} />
											</div>
											<ResolvedLink link={item.link} aAttrs={{className: 'btn btn_more'}}>
												{textLabels.read_more_label}
											</ResolvedLink>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

YachtPosts.propTypes = {
	yacht: yachtPagePropType().isRequired,
	blockIndex: PropTypes.number.isRequired,
};