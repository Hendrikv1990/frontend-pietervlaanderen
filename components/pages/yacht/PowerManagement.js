import {yachtPagePropType} from '../../../propTypes/yacht';
import PropTypes from 'prop-types';
import ExpandedCover from '../../covers/ExpandedCover';
import {getSectionIdByIndex} from '../../../lib/utils';
import SolarBenefitsSlider from './solar/BenefitsSlider';

export default function YachtPowerManagement({blockIndex, yacht}) {
	if (!yacht.solar_title)
		return;

	return (
		<ExpandedCover blockIndex={blockIndex}
									 block={{
										 image: yacht.solar_image,
										 title: yacht.solar_title,
										 link: yacht.solar_button_link,
										 link_label: yacht.solar_button_link_label
									 }}
									 isWhite={true}
		>
			<section id={getSectionIdByIndex(blockIndex)}
							 data-section={blockIndex}
							 data-section-color={'black'}
			>
				<div className={'cover__more'}>
					<SolarBenefitsSlider slides={yacht.group_solar_technical_slides} />
				</div>
			</section>
		</ExpandedCover>
	);
}

YachtPowerManagement.propTypes = {
	blockIndex: PropTypes.number.isRequired,
	yacht: yachtPagePropType().isRequired
};