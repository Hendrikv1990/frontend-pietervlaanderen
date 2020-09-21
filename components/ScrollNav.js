import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {getSectionIdByIndex} from '../lib/utils';
import {scrollToSection} from '../lib/scrollToElement';
import _throttle from 'lodash/throttle';

export default function ScrollNav({links}) {
	const [activeSection, setActiveSection] = useState(null);
	const [color, setColor] = useState(null);

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

			if (firstSection.$section.dataset.sectionColor) {
				setColor(firstSection.$section.dataset.sectionColor);
			} else {
				setColor(null);
			}
		} else {
			setActiveSection(null);
		}
	}, 300, {
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
		<div className={clsx('scroll-nav', color && `color-${color}`)}>
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
	if ($section.parentNode.dataset.subSection == 'closed') {
		return 0;
	}

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

	// (bottomIntersection - topIntersection) / height * 100
	return Math.round(
		(bottomIntersection - topIntersection) / Math.min(height, windowHeight) * 100
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