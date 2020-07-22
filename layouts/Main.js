import PropTypes from 'prop-types';
import LangSwitcher from '../components/LangSwitcher';
import PrismicScript from '../components/PrismicScript';

export default function MainLayout({children}) {
	return (
		<div className={'layout'}>
			<section>
				<LangSwitcher />
			</section>
			<section>
				{children}
			</section>
			<PrismicScript />
		</div>
	);
}

MainLayout.propTypes = {
	children: PropTypes.node
};