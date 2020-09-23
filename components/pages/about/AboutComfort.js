import PropTypes from 'prop-types';
import {aboutPagePropType} from '../../../propTypes/about';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import {getSectionIdByIndex} from '../../../lib/utils';
import ScrollAnimation from 'react-animate-on-scroll';


export default function AboutComfortSection({aboutPage, blockIndex}) {
	return (
		<section className="cover cover_gravity"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
						 data-section-color={'black'}
		>
			<div className="cover__wrapper">
				<div className="cover__bg-img">
					<div className="cover__img"
							 style={{backgroundImage: `url(${aboutPage.comfort_cover_image.url})`}}
					></div>
				</div>
				<div className="cover__content">
					<div className="container">
						<div className="gravity flex flex_column flex_sb_c flex_sm_sb-fs">
							<div className="title-block">
								<ScrollAnimation animateIn='animate__fadeInDown'
																 animateOut='animate__fadeInDown'>
								<h2 className="h1">
									<AsText value={aboutPage.comfort_title} />
								</h2>
								</ScrollAnimation>
								<ScrollAnimation animateIn='animate__fadeInDown'
																 animateOut='animate__fadeInDown'>
								<div className="title-block__sub-title">
									<AsText value={aboutPage.comfort_sub_title} />
								</div>
								</ScrollAnimation>
							</div>
							<div className="gravity__bottom flex flex_sb_c flex_sm_column">
								<ScrollAnimation animateIn='animate__fadeInDown'
																 animateOut='animate__fadeInDown'>
								<div className="gravity__text no-last-margin">
									<ResolvedHtmlField content={aboutPage.comfort_description} />
								</div>
								</ScrollAnimation>
								<div className="gravity__img-block">
									<img src={aboutPage.gravity_image.url}
											 alt={aboutPage.gravity_image.alt}
											 className="gravity__img"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

AboutComfortSection.propTypes = {
	aboutPage: aboutPagePropType().isRequired,
	blockIndex: PropTypes.number
};