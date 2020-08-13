import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const propulsionPagePropType = () => PropTypes.shape({
	header_title: PropTypes.array,
	header_subtitle: PropTypes.array,
	header_image: imagePropType(),
	quote_title: PropTypes.array,
	quote_body: PropTypes.array,
	how_it_works_video: PropTypes.array,
	hybrid_technology_title: PropTypes.array,
	hybrid_technology_body: PropTypes.array,
	electric_technology_title: PropTypes.array,
	electric_technology_body: PropTypes.array,
	customised_proposal: PropTypes.array,
	yachts_menu: PropTypes.arrayOf(
		PropTypes.shape({
			_meta: PropTypes.object
		})
	)
});

// export const propulsionYachtDataPropType = () => PropTypes.shape({
// 	group_hybrid_technical_slides: PropTypes.arrayOf(
// 		propulsionTechSlidePropType()
// 	),
//
// 	group_electric_technical_slides: PropTypes.arrayOf(
// 		propulsionTechSlidePropType()
// 	),
// });