import {aboutPagePropType} from '../../../propTypes/about';
import PropTypes from 'prop-types';
import {getSectionIdByIndex} from '../../../lib/utils';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import ScrollAnimation from 'react-animate-on-scroll';


export default function EnvironmentBenefits({aboutPage, blockIndex}) {
	return (
		<section className="section section_eco text_center"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
		>
			<div className="container">
				<div className="section__header">
					<div className="section__header">
						<ScrollAnimation animateIn='animate__fadeInDown'
														 animateOut='animate__fadeInDown'>
							<h2 className="h2">
								<AsText value={aboutPage.environment_title} />
							</h2>
						</ScrollAnimation>
					</div>
					<div className="section__body">
						<div className="eco flex flex_sb_s flex_wrap">
							{aboutPage.group_environment_specifications.map((item, i) => (
								<div key={i}
										 className="eco__item"
								>
									<ScrollAnimation animateIn='animate__fadeInDown'
																	 animateOut='animate__fadeInDown'>
									<div className="eco__icon-block">
										<img src={item.icon.url} alt={item.icon.alt} className="eco__icon" />
									</div>
									</ScrollAnimation>

									<ScrollAnimation animateIn='animate__fadeIn'
																	 animateOut='animate__fadeIn'>
									<div className="eco__descr no-last-margin">
										<ResolvedHtmlField content={item.description} />
									</div>
									</ScrollAnimation>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

EnvironmentBenefits.propTypes = {
	aboutPage: aboutPagePropType().isRequired,
	blockIndex: PropTypes.number
};