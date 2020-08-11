import {aboutPagePropType} from '../../../propTypes/about';
import PropTypes from 'prop-types';
import {getSectionIdByIndex} from '../../../lib/utils';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import _isEmpty from 'lodash/isEmpty';
import ResolvedLink from '../../ResolvedLink';
import SliderGallery from '../../galleries/SliderGallery';

export default function OpenShipyard({aboutPage, blockIndex}) {
	return (
		<section className="section section_gallery"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
		>
			<div className="container">
				<div className="section__header flex flex_sa_c flex_md_sb-c flex_sm_column">
					<div className="title-block">
						<h2 className="h1">
							<AsText value={aboutPage.shipyard_title} />
						</h2>
						<div className="title-block__sub-title no-last-margin">
							<ResolvedHtmlField content={aboutPage.shipyard_description} />
						</div>
					</div>
					{!_isEmpty(aboutPage.shipyard_button_title) && !_isEmpty(aboutPage.shipyard_button_link) &&
						<ResolvedLink link={aboutPage.shipyard_button_link}
													aAttrs={{className: 'btn btn_border btn_width_auto'}}
						>
							<AsText value={aboutPage.shipyard_button_title} />
						</ResolvedLink>
					}
				</div>
				<div className="section__body">
					{!_isEmpty(aboutPage.group_shipyard_image_slides) &&
					<SliderGallery slides={aboutPage.group_shipyard_image_slides} />
					}
				</div>
			</div>
		</section>
	);
}

OpenShipyard.propTypes = {
	aboutPage: aboutPagePropType().isRequired,
	blockIndex: PropTypes.number
};