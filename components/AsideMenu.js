import NextLink from 'next/link';
import {useTranslation} from './Locale';
import {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {menuPropType} from '../propTypes/menu';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {actionTypes as asideMenuActionTypes} from '../redux/reducers/asideMenu';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import ModelsMenu from './asideMenu/ModelsMenu';
import SecondaryMenu from './asideMenu/SecondaryMenu';
import {useTextLabels} from '../hooks/appData';
import ResolvedLink from './ResolvedLink';
import SocialMenu from './footer/SocialMenu';
import {useDrag} from 'react-use-gesture';

function AsideMenu({isOpened, closeAsideMenu}) {
	const rootEl = useRef(null);
	const {locale} = useTranslation();

	useEffect(() => {
		if (isOpened) {
			disableBodyScroll(rootEl.current);
		} else {
			enableBodyScroll(rootEl.current);
		}

		return () => clearAllBodyScrollLocks();
	}, [isOpened]);

	const {textLabels} = useTextLabels();

	const bind = useDrag(({ last, vxvy: [vx] }) => {
		if (last && Math.abs(vx) > 0.15) {
			//swipe right
			if (vx > 0) {
				closeAsideMenu();
			}
		}
	});

	return (
		<aside className={clsx('aside-menu', {'is-opened': isOpened})}
					 ref={rootEl}
					 {...bind()}
		>

			<div className={'logo'}>
				<NextLink href='[lang]' as={`/${locale}`}>
					<a className="logo__link">
						<img className="logo__img"
								 src={require('../assets/img/logo-black.svg')} alt={''} />
					</a>
				</NextLink>
			</div>

			<button type="button" className={'btn btn_close'}
							onClick={(e) => {e.preventDefault();closeAsideMenu();}}
			>close</button>
			<div className={'aside-menu__wrapper flex flex_fe_c flex_column'}>
				<div className="aside-menu__menus">
					<ModelsMenu />
					<SecondaryMenu />
				</div>
				<p>
					<ResolvedLink link={textLabels.find_distributor_link}
												aAttrs={{className: 'btn btn_border'}}
					>
						{textLabels.find_your_distributor}
					</ResolvedLink>
				</p>
				<SocialMenu />
				<p>
					<ResolvedLink link={textLabels.download_brochure_link}
												aAttrs={{className: 'link link_small'}}
					>
						{textLabels.download_brochure_label}
					</ResolvedLink>
				</p>
			</div>
		</aside>
	);
}

AsideMenu.propTypes = {
	secondaryMenu: menuPropType().isRequired,
	isOpened: PropTypes.bool.isRequired,
	closeAsideMenu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	secondaryMenu: state.menu['secondary-menu'],
	isOpened: state.asideMenu.isOpened
});

function mapDispatchToProps(dispatch) {
	return {
		closeAsideMenu: () => dispatch({
			type: asideMenuActionTypes.SET_IS_OPENED,
			payload: false
		})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AsideMenu);