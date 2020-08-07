import {yachtPagePropType} from '../../../propTypes/yacht';
import PropTypes from 'prop-types';
import ExpandedCover from '../../covers/ExpandedCover';
import {getSectionIdByIndex} from '../../../lib/utils';
import DeckBlock from './technicalSpecifications/DeckBlock';
import TechSpecs from './technicalSpecifications/TechSpecs';

export default function YachtTechnicalSpecifications({blockIndex, yacht}) {

	return (
		<ExpandedCover blockIndex={blockIndex}
									 block={{
										 image: yacht.technical_specs_image,
										 title: yacht.technical_specs_title,
										 link: yacht.technical_specs_button_link,
										 link_label: yacht.technical_specs_button_link_label
									 }}
									 sectionColor={'black'}
		>
			<section id={getSectionIdByIndex(blockIndex)}
							 data-section={blockIndex}
							 data-section-color={'black'}
			>
				<div className={'cover__more'}>
					<DeckBlock yacht={yacht} />
					{Array.isArray(yacht.group_technical_specs_slides)
						&& yacht.group_technical_specs_slides.length
						&& <TechSpecs yacht={yacht} />
					}
				</div>
			</section>
		</ExpandedCover>
	);
}

YachtTechnicalSpecifications.propTypes = {
	blockIndex: PropTypes.number.isRequired,
	yacht: yachtPagePropType().isRequired
};