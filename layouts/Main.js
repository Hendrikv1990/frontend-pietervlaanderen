import PropTypes from 'prop-types';
import PrismicScript from '../components/PrismicScript';
import Head from 'next/head';
import TopLine from '../components/header/TopLine';
import Footer from '../components/Footer';
import AsideMenu from '../components/AsideMenu';
import {connect} from 'react-redux';
import clsx from 'clsx';
import {actionTypes as asideMenuActionTypes} from '../redux/reducers/asideMenu';

function MainLayout({children, asideIsOpened, closeAsideMenu, extraClasses, isWhite, topLineExtraClasses}) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			</Head>
			<div className={clsx(
				'layout',
				'layout-main',
				{
					'aside-opened': asideIsOpened,
					'is-white': isWhite === true
				},
				extraClasses
			)}>
				<header className="header">
					<TopLine isWhite={isWhite}
									 extraClasses={topLineExtraClasses}
					/>
				</header>
				<main className="main">
					{children}
				</main>
				<Footer />
				<PrismicScript />
				<div className={'aside-backdrop'} onClick={() => closeAsideMenu()} />
			</div>
			<AsideMenu/>
		</>
	);
}

MainLayout.propTypes = {
	children: PropTypes.node,
	asideIsOpened: PropTypes.bool.isRequired,
	closeAsideMenu: PropTypes.func.isRequired,
	extraClasses: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	isWhite: PropTypes.bool,
	topLineExtraClasses: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
};

const mapStateToProps = state => ({
	asideIsOpened: state.asideMenu.isOpened
});

const mapDispatchToProps = dispatch => ({
	closeAsideMenu: () => dispatch({
		type: asideMenuActionTypes.SET_IS_OPENED,
		payload: false
	})
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);