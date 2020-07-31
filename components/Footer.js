import FooterContacts from './footer/Contacts';
import FooterAddress from './footer/Address';
import FooterPhone from './footer/Phone';
import FooterSocialMenu from './footer/SocialMenu';
import {useTextLabels} from '../hooks/appData';
import ResolvedHtmlField from './ResolvedHtmlField';
import ResolvedLink from './ResolvedLink';

export default function Footer() {
	const {textLabels} = useTextLabels();

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__top flex flex_sb_s">
					<FooterContacts />
					<div className="footer__col footer__col_right flex flex_sb_s hide_md">
						<FooterAddress />
						<FooterPhone />
					</div>
				</div>
				<div className="footer__bottom flex flex_sb_c">
					<FooterSocialMenu />
					<div className="copyright">
						<ResolvedHtmlField content={textLabels.copyright} />
					</div>
					<ul className="link-list flex flex_fs_c">
						<li className="link-list__item">
							<ResolvedLink link={textLabels.terms_of_use_link}
														aAttrs={{className: 'link-list__link'}}
							>
								{textLabels.terms_of_use_label}
							</ResolvedLink>
						</li>
						<li className="link-list__item">
							<ResolvedLink link={textLabels.privacy_link}
														aAttrs={{className: 'link-list__link'}}
							>
								{textLabels.privacy_label}
							</ResolvedLink>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
