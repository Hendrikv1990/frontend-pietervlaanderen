import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {getSectionIdByIndex} from '../lib/utils';
import {scrollToSection} from '../lib/scrollToElement';
import _throttle from 'lodash/throttle';

export default function ScrollNav({links}) {
	const [activeSection, setActiveSection] = useState(null);

	const reCalcPositions = _throttle(() => {
		const sections = document.querySelectorAll('[data-section]');

		const sectionsWithVisibility = Array.from(sections).map(($section) => ({
				$section,
				visiblePercent: calcVisiblePercent($section)
		})).sort(({visiblePercent: a}, {visiblePercent: b}) => {
			if (a > b) return -1;
			if (a == b) return 0;
			return 1;
		});

		const [firstSection] = sectionsWithVisibility;
		if (firstSection && firstSection.visiblePercent > 25) {
			setActiveSection(parseInt(firstSection.$section.dataset.section));
		} else {
			setActiveSection(null);
		}
	}, 400, {
		leading: false
	});

	useEffect(() => {
		window.addEventListener('scroll', reCalcPositions);
		window.addEventListener('resize', reCalcPositions);

		reCalcPositions();
		return () => {
			window.removeEventListener('scroll', reCalcPositions);
			window.removeEventListener('resize', reCalcPositions);
		};
	}, []);// eslint-disable-line

	function onNavClicked(key, e) {
		e.preventDefault();
		scrollToSection(key);
	}

	return (
		<div className={'scroll-nav'}>
			{links.map((link, i) => (
				<a key={i}
					 href={`#${getSectionIdByIndex(link.sectionKey)}`}
					 onClick={onNavClicked.bind(this, link.sectionKey)}
					 className={clsx({active: link.sectionKey === activeSection})}
				>
					<span className={'vert-line'} />
					<span className={'block-title'}>{link.title}</span>
				</a>
			))}
		</div>
	);
}

ScrollNav.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			sectionKey: PropTypes.number,
			title: PropTypes.string.isRequired
		})
	)
};

function calcVisiblePercent($section) {
	const {top, height} = $section.getBoundingClientRect();

	const topCorner = top + window.scrollY;
	const bottomCorner = top + window.scrollY + height;
	const viewportTop = window.scrollY;
	const windowHeight = window.innerHeight;
	const viewportBottom = window.scrollY + windowHeight;

	const topIntersection = Math.max(topCorner, viewportTop);
	const bottomIntersection = Math.min(bottomCorner, viewportBottom);

	if (topIntersection >= bottomIntersection) {
		return 0;
	}

	return Math.round(
		(bottomIntersection - topIntersection) / height * 100
	);
	// if (
	// 	//block inside viewport:
	// 	(topCorner >= windowTop && bottomCorner <= windowBottom)
	// 	//if block is big and doesn't fit to viewport
	// 	|| (
	// 		height >= windowHeight && topCorner <= windowTop && bottomCorner >= windowTop
	// 		&& (bottomCorner <= windowBottom || bottomCorner >= windowBottom)
	// 	)
	// ) {
	// 	return true;
	// }
	//
	// return false;
}