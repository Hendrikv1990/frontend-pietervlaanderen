import {useTextLabels} from '../../../../../hooks/appData';
import {scrollToSection} from '../../../../../lib/scrollToElement';

export default function TechSpecsAfterTable() {
	const {textLabels} = useTextLabels();

	return (
		<div className="tabs__content-item-footer hide_xs">
			<a href="#"
				 className="btn btn_teal"
				 onClick={(e) => {e.preventDefault();scrollToSection(2);}}
			>
				{textLabels.check_propulsion_option_label}
			</a>
		</div>
	);
}