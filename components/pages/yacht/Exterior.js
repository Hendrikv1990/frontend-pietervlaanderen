import {yachtPagePropType} from '../../../propTypes/yacht';
import PropTypes from 'prop-types';
import ExpandedCover from '../../covers/ExpandedCover';
import {getSectionIdByIndex} from '../../../lib/utils';
import SliderGallery from '../../galleries/SliderGallery';
import {isRichEmpty} from '../../../lib/utils';
import AsText from '../../AsText';
import ListGallery from '../../galleries/ListGallery';
import _isEmpty from 'lodash/isEmpty';

export default function YachtExterior({blockIndex, yacht}) {
	const {
		group_exterior_image_slides: slides,
	} = yacht;

	return (
		<ExpandedCover blockIndex={blockIndex}
									 block={{
										 image: yacht.exterior_image,
										 title: yacht.exterior_title,
										 link: yacht.exterior_button_link,
										 link_label: yacht.exterior_button_link_label
									 }}
									 isWhite={true}
		>
			<section id={getSectionIdByIndex(blockIndex)}
							 data-section={blockIndex}
							 data-section-color={'black'}
			>
				<div className={'cover__more'}>
					<div className="container">
						<div className="gallery-block">
							{!_isEmpty(slides) &&
							<SliderGallery slides={slides} />
							}
							<div className="gallery-block__wrapper">
								{!isRichEmpty(yacht.exterior_gallery_title) &&
								<div className="gallery-block__title flex flex_sb_c hide_sm">
									<h2 className="h2">
										<AsText value={yacht.exterior_gallery_title} />
									</h2>
								</div>
								}
								{!_isEmpty(yacht.group_exterior_feature_image_blocks) &&
								<ListGallery gallery={yacht.group_exterior_feature_image_blocks} />
								}
							</div>
						</div>
					</div>
				</div>
			</section>
		</ExpandedCover>
	);
}

YachtExterior.propTypes = {
	blockIndex: PropTypes.number.isRequired,
	yacht: yachtPagePropType().isRequired
};