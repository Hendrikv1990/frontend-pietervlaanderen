import {aboutPagePropType} from '../../../propTypes/about';
import PropTypes from 'prop-types';
import {getSectionIdByIndex} from '../../../lib/utils';
import CoverImg from '../../covers/components/CoverImg';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import ScrollAnimation from 'react-animate-on-scroll';


export default function MotherlandSection({aboutPage, blockIndex}) {
	return (
		<section className="cover"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
		>
			<div className="cover__wrapper">
				<div className="cover__bg-img">
					<CoverImg image={aboutPage.made_cover_image} />
				</div>
				<div className="cover__shadow"></div>
				<div className="cover__content cover__content_bottom cover__content_bottom_md-full">
					<div className="container">
						<div className="flex flex_sb_fe flex_md_column-reverse flex_full">
							<ul className="list-icon flex flex_sb_s">
								{aboutPage.group_made_icons.map((item, i) => (
									<li key={i}
											className="list-icon__item flex flex_column"
									>
										<ScrollAnimation animateIn='animate__fadeInDown'
																		 animateOut='animate__fadeInDown'>
										<div className="list-icon__icon-block">
											<img src={item.icon.url} alt={item.icon.alt} className="list-icon__icon" />
										</div>
										<div className="list-icon__title no-last-margin">
											<span className="hide_xs">
												<ResolvedHtmlField content={item.description} />
											</span>
											<span className="show_xs">
												<ResolvedHtmlField content={item.xs_description} />
											</span>
										</div>
										</ScrollAnimation>
									</li>
								))}
							</ul>
							<div className="info-block">
								<ScrollAnimation animateIn='animate__fadeInDown'
																 animateOut='animate__fadeInDown'>
								<h2 className="h2 info-block__title no-last-margin">
									<ResolvedHtmlField content={aboutPage.made_title} />
								</h2>
								</ScrollAnimation>
								<ScrollAnimation animateIn='animate__fadeIn'
																 animateOut='animate__fadeIn'>
								<div className="info-block__text">
									{/*<span className="hide_xs">*/}
									<ResolvedHtmlField content={aboutPage.made_description} />
									{/*</span>*/}
									{/*<span className="show_xs">*/}
									{/*	<p>Greenline Yachts are built in Slovenia, a country praised for its intact nature and sustainable mindset of its inhabitants.</p>*/}
									{/*</span>*/}
								</div>
								</ScrollAnimation>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

MotherlandSection.propTypes = {
	aboutPage: aboutPagePropType().isRequired,
	blockIndex: PropTypes.number
};