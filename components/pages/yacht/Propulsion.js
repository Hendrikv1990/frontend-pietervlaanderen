import PropTypes from 'prop-types';
import {yachtPagePropType} from '../../../propTypes/yacht';
import ExpandedCover from '../../covers/ExpandedCover';
import {getSectionIdByIndex} from '../../../lib/utils';
import PropulsionDieselDrive from './propulsion/DieselDrive';
import HybridDrive from './propulsion/HybridDrive';
import ElectricDrive from './propulsion/ElectricDrive';

export default function YachtPropulsion({blockIndex, yacht}) {
	if (!yacht.propulsion_title)
		return;

	return (
		<ExpandedCover blockIndex={blockIndex}
									 block={{
										 image: yacht.propulsion_image,
										 title: yacht.propulsion_title,
										 link: yacht.propulsion_button_link,
										 link_label: yacht.propulsion_button_link_label,
									 }}
									 isWhite={true}
									 showEngineTypesList={true}
		>
			{() => (
				<section id={getSectionIdByIndex(blockIndex)}
								 data-section={blockIndex}
								 data-section-color={'black'}
				>
					<div className="cover__more">
						<div className="propulsion">
							<PropulsionDieselDrive yacht={yacht} />
							<HybridDrive yacht={yacht} />
							<ElectricDrive yacht={yacht} />
						</div>
					</div>
				</section>
			)}
		</ExpandedCover>
	);
}

YachtPropulsion.propTypes = {
	blockIndex: PropTypes.number.isRequired,
	yacht: yachtPagePropType().isRequired
};