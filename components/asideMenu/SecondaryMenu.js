import {menuPropType} from '../../propTypes/menu';
import {connect} from 'react-redux';
import ResolvedLink from '../ResolvedLink';
import {RichText} from 'prismic-reactjs';

function SecondaryMenu({secondaryMenu}) {
	return (
		<ul className={'secondary-menu flex flex_fs_c flex_column'}>
			{secondaryMenu.menu_links.map((item, i) => (
				<li key={i} className="secondary-menu__item">
					<ResolvedLink link={item.link}
												aAttrs={{className: 'secondary-menu__link'}}
					>
						{RichText.asText(item.label)}
					</ResolvedLink>
				</li>
			))}
		</ul>
	);
}

SecondaryMenu.propTypes = {
	secondaryMenu: menuPropType().isRequired,
};

const mapStateToProps = state => ({
	secondaryMenu: state.menu['secondary-menu']
});

export default connect(mapStateToProps)(SecondaryMenu);