import NextLink from 'next/link';
import {useTranslation} from '../Locale';
import TopMenu from './TopMenu';
import {connect} from 'react-redux';
import {actionTypes as asideMenuActionTypes} from '../../redux/reducers/asideMenu';
import PropTypes from 'prop-types';
import LangSwitcher from '../LangSwitcher';

function TopLine({openAsideMenu}) {
	const {locale} = useTranslation();

	function onHamburgerClicked(e) {
		e.preventDefault();
		openAsideMenu();
	}

	return (
		<div className={'top-line'}>
			<div className={'container'}>
				<div className={'flex flex_sb_c'}>
					<div className={'logo'}>
						<NextLink href='[lang]' as={`/${locale}`}>
							<a className="logo__link">
								<img className="logo__img"
										 src={require('../../assets/img/logo.svg')} alt={''} />
							</a>
						</NextLink>
					</div>
					<TopMenu />
					<LangSwitcher />
					<button type="button" className="hamburger" onClick={onHamburgerClicked}>
						<span className="hamburger__line hamburger__line_first"></span>
						<span className="hamburger__line hamburger__line_middle"></span>
						<span className="hamburger__line hamburger__line_last"></span>
					</button>
				</div>
			</div>
		</div>
	);
}

TopLine.propTypes = {
	openAsideMenu: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		openAsideMenu: () => dispatch({
			type: asideMenuActionTypes.SET_IS_OPENED,
			payload: true
		})
	};
}

export default connect(null, mapDispatchToProps)(TopLine);