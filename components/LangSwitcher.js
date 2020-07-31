import {useEffect, useRef} from 'react';
import {locales} from '../prismic-configuration';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {useTranslation} from './Locale';
import PropTypes from 'prop-types';
import {actionTypes as langSwitcherActionTypes} from '../redux/reducers/langSwitcher';
import {connect} from 'react-redux';
import NextLink from 'next/link';

function LangSwitcher({isOpened, setIsOpened}) {
	const router = useRouter();
	const {locale} = useTranslation();
	const rootEl = useRef(null);

	function onBodyClicked(e) {
		if (!rootEl || !rootEl.current || String(rootEl.current.dataset.open) != '1')
			return;

		if (!rootEl.current.contains(e.target)) {
			setIsOpened(false);
		}
	}

	useEffect(() => {
		document.body.addEventListener('click', onBodyClicked);
		return () => document.body.removeEventListener('click', onBodyClicked);
	}, []);// eslint-disable-line

	function getSwitchLinkParams(code) {
		const query = Object.assign({}, router.query, {
			lang: code
		});

		let asPath = router.pathname;
		for (const key of Object.keys(query)) {
			asPath = asPath.replace(`[${key}]`, query[key]);
		}

		return {
			href: router.pathname,
			as: asPath
		};
	}

	return (
		<div className="lang"
				 ref={rootEl}
				 data-open={isOpened ? '1' : '0'}
		>
			<div className="lang__current">
				<button type={'button'} onClick={() => setIsOpened(!isOpened)}>
					{locale}
				</button>
				<ul className={clsx('switch-lang-menu', {opened: isOpened})}>
					{Object.keys(locales).map((item, i) => {
						const {as, href} = getSwitchLinkParams(item);

						return (
							<li key={i}>
								<NextLink as={as} href={href}>
									<a className={clsx({active: item == locale})}
									>
										{locales[item].title}
									</a>
								</NextLink>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

LangSwitcher.propTypes = {
	setIsOpened: PropTypes.func.isRequired,
	isOpened: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isOpened: state.langSwitcher.isOpened
});

const mapDispatchToProps = dispatch => ({
	setIsOpened: (val) => dispatch({
		type: langSwitcherActionTypes.SET_IS_OPENED,
		payload: val
	})
});

export default connect(mapStateToProps, mapDispatchToProps)(LangSwitcher);