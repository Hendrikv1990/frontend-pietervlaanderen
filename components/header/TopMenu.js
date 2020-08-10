import {connect} from 'react-redux';
import {menuPropType} from '../../propTypes/menu';
import ResolvedLink from '../ResolvedLink';
import {RichText} from 'prismic-reactjs';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function TopMenu({mainMenu, isBlack}) {
	return (
		<nav className="menu hide_md">
			<ul className={clsx('top-menu flex flex_fs_c', {'is-black': isBlack === true})}>
				{mainMenu.menu_links.map((item, i) => (
					<li key={i}
							className="top-menu__item"
					>
						<ResolvedLink link={item.link} aAttrs={{className: 'top-menu__link'}}>
							{RichText.asText(item.label)}
						</ResolvedLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

TopMenu.propTypes = {
	mainMenu: menuPropType().isRequired,
	isBlack: PropTypes.bool
};

const mapStateToProps = state => ({mainMenu: state.menu['main-menu']});

export default connect(mapStateToProps)(TopMenu);