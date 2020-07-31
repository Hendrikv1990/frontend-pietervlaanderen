import ResolvedLink from '../ResolvedLink';
import {menuPropType} from '../../propTypes/menu';
import {connect} from 'react-redux';

function FooterSocialMenu({socialMenu}) {
	return (
		<ul className="social">
			{socialMenu.menu_links.map((item, i) => (
				<li key={i}
						className="social__item"
				>
					<ResolvedLink link={item.link} aAttrs={{className: 'social__link'}}>
						<img src={item.icon.url} />
					</ResolvedLink>
				</li>
			))}
		</ul>
	);
}

FooterSocialMenu.propTypes = {
	socialMenu: menuPropType().isRequired
};

const mapStateToProps = state => ({socialMenu: state.menu['social-menu']});

export default connect(mapStateToProps)(FooterSocialMenu);