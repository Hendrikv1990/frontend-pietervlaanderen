import {useTextLabels} from '../../hooks/appData';
import {RichText} from 'prismic-reactjs';
import SocialMenu from './SocialMenu';

export default function FooterAddress() {
	const {textLabels} = useTextLabels();

	return (
		<div className="footer__address flex flex_column">
			<h4 className="h4">{textLabels.address_label}</h4>
			<div className="text">
				<RichText render={textLabels.address} />
			</div>
			<SocialMenu />
		</div>
	);
}