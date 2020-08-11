import {aboutPagePropType} from '../../../propTypes/about';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import PropTypes from 'prop-types';

export default function AboutOurIdentity({aboutPage, blockIndex}) {
	return (
		<section className="section section_our-identity"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
		>
			<div className="container">
				<div className="our-identity flex flex_sb_fs flex_md_column">
					<div className="our-identity__left">
						<div className="section__header">
							<div className="title-block">
								<h2 className="h1">
									<AsText value={aboutPage.identity_title} />
								</h2>
								<div className="title-block__sub-title">
									<AsText value={aboutPage.identity_description} />
								</div>
							</div>
						</div>
						<div className="section__img">
							<img src={aboutPage.identity_image.url}
									 alt={aboutPage.identity_image.alt}
									 className="our-identity__img" />
						</div>
					</div>
					<div className="our-identity__right">
						{aboutPage.group_values.map((item, i) => (
							<div key={i}
									 className="our-identity__item"
							>
								<div className="flex flex_fs_c">
									<div className="our-identity__icon-block">
										<img src={item.icon.url} alt={item.icon.alt} className="our-identity__icon" />
									</div>
									<div className="our-identity__title-block">
										<h3 className="our-identity__title">
											<AsText value={item.title} />
										</h3>
										<div className="our-identity__sub-title">
											<AsText value={item.subtitle} />
										</div>
									</div>
								</div>
								<div className="our-identity__text no-last-margin">
									<ResolvedHtmlField content={item.description} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

AboutOurIdentity.propTypes = {
	aboutPage: aboutPagePropType().isRequired,
	blockIndex: PropTypes.number
};