import PropTypes from 'prop-types';
import {linkPropType} from './common';

export const textLabelsPropType = () => PropTypes.shape({
	address_label: PropTypes.string.isRequired,
	address: PropTypes.array.isRequired,
	all_our_models_available_as: PropTypes.string.isRequired,
	footer_contacts_header: PropTypes.string.isRequired,
	footer_contacts_text: PropTypes.array.isRequired,
	send_message: PropTypes.string.isRequired,
	send_a_message_link: linkPropType().isRequired,
	find_your_distributor: PropTypes.string.isRequired,
	find_distributor_link: linkPropType().is,
	contact: PropTypes.string.isRequired,
	address_with_phone: PropTypes.array.isRequired,
	phone_label: PropTypes.string.isRequired,
	phone: PropTypes.array.isRequired,
	other_contacts: PropTypes.string.isRequired,
	other_contacts_link: linkPropType().isRequired,
	copyright: PropTypes.array.isRequired,
	terms_of_use_label: PropTypes.string.isRequired,
	terms_of_use_link: linkPropType().isRequired,
	privacy_label: PropTypes.string.isRequired,
	privacy_link: linkPropType().isRequired,
	models_label: PropTypes.string.isRequired,
	download_brochure_label: PropTypes.string.isRequired,
	download_brochure_link: linkPropType().isRequired,
	discover_more_label: PropTypes.string.isRequired,
	discover_label: PropTypes.string.isRequired,
	videos_label: PropTypes.string.isRequired,
	get_in_touch_label: PropTypes.string.isRequired,
	get_in_touch_link: linkPropType().isRequired,
	press_tests_label: PropTypes.string.isRequired,
	read_more_label: PropTypes.string.isRequired,
	reviews_label: PropTypes.string.isRequired,
	imperial_label: PropTypes.string.isRequired,
	metric_label: PropTypes.string.isRequired,
	check_propulsion_option_label: PropTypes.string.isRequired,
	how_it_works_watch_video: PropTypes.string.isRequired,
	in_partnership_with: PropTypes.string.isRequired,
	contact_us_label: PropTypes.string,
	contact_us_link: linkPropType()
});