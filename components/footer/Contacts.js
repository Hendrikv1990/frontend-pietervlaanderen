import {useTextLabels} from '../../hooks/appData';
import ResolvedLink from '../ResolvedLink';
import {RichText} from 'prismic-reactjs';

export default function FooterContacts() {
	const {textLabels} = useTextLabels();

	return (
		<div className="footer__col">
			<h4 className="h4">{textLabels.footer_contacts_header}</h4>
			<p className="text">
				{RichText.asText(textLabels.footer_contacts_text)}
			</p>
			<div className="flex flex_sb_c footer__btns">
				<ResolvedLink link={textLabels.send_a_message_link}
											aAttrs={{className: 'btn btn_border hide_md'}}
				>
					{textLabels.send_message}
				</ResolvedLink>
				<ResolvedLink link={textLabels.find_distributor_link}
											aAttrs={{className: 'btn btn_border'}}
				>
					{textLabels.find_your_distributor}
				</ResolvedLink>
			</div>
			<div className="footer__contacts show_md">
				<h4 className="h4">{textLabels.contact}</h4>
				<div className="text">
					<RichText render={textLabels.address_with_phone} />
				</div>
				<div className="flex flex_sb_c footer__btns">
					<ResolvedLink link={textLabels.send_a_message_link}
												aAttrs={{className: 'btn btn_border'}}
					>
						{textLabels.send_message}
					</ResolvedLink>
				</div>
			</div>
		</div>
	);
}