import {yachtPagePropType} from '../../../propTypes/yacht';
import PropTypes from 'prop-types';
import ExpandedCover from '../../covers/ExpandedCover';
import {getSectionIdByIndex} from '../../../lib/utils';
import VirtualTour from '../../VirtualTour';

export default function YachtVirtualTourSection({blockIndex, yacht}) {
	return (
		<ExpandedCover blockIndex={blockIndex}
									 block={{
										 image: yacht.virtual_tour_image,
										 title: yacht.virtual_tour_title,
										 link: yacht.virtual_button_link,
										 link_label: yacht.virtual_button_link_label
									 }}
									 isWhite={true}
									 sectionColor={'black'}
		>
			{() => (
				<section className="cover virtual-tour"
								 id={getSectionIdByIndex(blockIndex)}
								 data-section={blockIndex}
								 data-section-color={'black'}
				>
					<div className={'cover__wrapper'}>
						<VirtualTour imgs={yacht.virtual_tour_360_imgs} />
					</div>
				</section>
			)}
		</ExpandedCover>
	);
}


YachtVirtualTourSection.propTypes = {
	blockIndex: PropTypes.number.isRequired,
	yacht: yachtPagePropType().isRequired
};