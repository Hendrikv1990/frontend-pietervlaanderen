import {yachtPagePropType} from '../../../propTypes/yacht';
import PropTypes from 'prop-types';
import ExpandedCover from '../../covers/ExpandedCover';
import {getSectionIdByIndex} from '../../../lib/utils';
import SliderGallery from '../../galleries/SliderGallery';
import {isRichEmpty} from '../../../lib/utils';
import AsText from '../../AsText';
import ListGallery from '../../galleries/ListGallery';

export default function YachtInterior({blockIndex, yacht}) {
	const {
		group_interior_image_slides: slides,
	} = yacht;

	return (
		<ExpandedCover blockIndex={blockIndex}
									 block={{
										 image: yacht.interior_image,
										 title: yacht.interior_title,
										 link: yacht.interior_button_link,
										 link_label: yacht.interior_button_link_label
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
							{Array.isArray(slides) && slides.length &&
							<SliderGallery slides={slides} />
							}
							<div className="gallery-block__wrapper">
								{!isRichEmpty(yacht.interior_gallery_title) &&
									<div className="gallery-block__title flex flex_sb_c hide_sm">
										<h2 className="h2">
											<AsText value={yacht.interior_gallery_title} />
										</h2>
										<div className="text">
											<AsText value={yacht.interior_gallery_description} />
										</div>
									</div>
								}
								{Array.isArray(yacht.group_interior_feature_image_blocks) && yacht.group_interior_feature_image_blocks.length &&
									<ListGallery gallery={yacht.group_interior_feature_image_blocks} />
								}
							</div>
						</div>
					</div>
				</div>
			</section>
		</ExpandedCover>
	);
}

YachtInterior.propTypes = {
	blockIndex: PropTypes.number.isRequired,
	yacht: yachtPagePropType().isRequired
};