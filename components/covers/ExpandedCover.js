import {useState} from 'react';
import {coverBlock} from '../../propTypes/covers';
import PropTypes from 'prop-types';
import CoverImg from './components/CoverImg';
import {useTextLabels} from '../../hooks/appData';
import ResolvedLink from '../ResolvedLink';
import clsx from 'clsx';
import {scrollToElement} from '../../lib/scrollToElement';
import {getSectionIdByIndex, isRichEmpty} from '../../lib/utils';
import AsText from '../AsText';
import CoverEngineTypesImgList from './components/CoverEngineTypesImgList';
import _isFunction from 'lodash/isFunction';

export default function ExpandedCover({blockIndex, block, isWhite, children, sectionColor, showEngineTypesList}) {
	const {textLabels} = useTextLabels();
	const [isOpened, setIsOpened] = useState(false);

	function discoverMoreClicked(e) {
		e.preventDefault();
		const newVal = !isOpened;
		setIsOpened(newVal);

		if (newVal) {
			//need to wait until animation ends
			setTimeout(() => scrollToElement(`#sub-sections-${blockIndex}`), 250);
		}
	}

	return (
		<>
			<section className="cover"
							 id={getSectionIdByIndex(blockIndex)}
							 data-section={blockIndex}
							 data-section-color={sectionColor}
			>
				<div className="cover__wrapper">
					<div className="cover__bg-img">
						<CoverImg image={block.image} />
					</div>
					<div className="cover__content cover__content_bottom">
						<div className="container">
							<h2 className={clsx('cover__title cover__title_sm', {text_color_black1: !isWhite})}>
								<AsText value={block.title} />
							</h2>
							<div className="flex flex_sb_c">
								<a href="#"
									 className={clsx('btn btn_xs btn_plus btn_plus_text', {btn_plus_white: isWhite})}
									 onClick={discoverMoreClicked}
								>
									<span className="hide_xs">{textLabels.discover_more_label}</span>
									<span className="show_xs">{textLabels.discover_label}</span>
								</a>
								{showEngineTypesList &&
									<div className="detailed detailed_horizontal detailed_rel">
										<CoverEngineTypesImgList />
									</div>
								}
								{!isRichEmpty(block.link_label) &&
								<ResolvedLink link={block.link}
															aAttrs={{
																className: clsx('btn btn_xs btn_border btn_width_auto', {btn_border_white: isWhite})
															}}
								>
									<AsText value={block.link_label} />
								</ResolvedLink>
								}
							</div>
						</div>
					</div>
				</div>
			</section>
			<div id={`sub-sections-${blockIndex}`}
					 className={clsx('sub-sections', {opened: isOpened})}
					 data-sub-section={isOpened ? 'opened' : 'closed'}
			>
				{_isFunction(children) && isOpened && children({isOpened})}
				{!_isFunction(children) && children}
			</div>
		</>
	);
}

ExpandedCover.propTypes = {
	block: coverBlock().isRequired,
	blockIndex: PropTypes.number.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.func
	]),
	isWhite: PropTypes.bool,
	sectionColor: PropTypes.string,
	showEngineTypesList: PropTypes.bool
};