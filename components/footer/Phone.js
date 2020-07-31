import {useTextLabels} from '../../hooks/appData';
import {RichText} from 'prismic-reactjs';
import ResolvedLink from '../ResolvedLink';

export default function FooterPhone() {
	const {textLabels} = useTextLabels();

	return (
		<div className="footer__phone flex flex_column">
			<h4 className="h4">{textLabels.phone_label}</h4>
			<div className={'text'}>
				<RichText render={textLabels.phone} />
			</div>
			<ResolvedLink link={textLabels.other_contacts_link}
										aAttrs={{className: 'link'}}
			>
				{textLabels.other_contacts}
			</ResolvedLink>
		</div>
	);
}