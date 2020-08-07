import {coverBlock} from '../../propTypes/covers';
import PropTypes from 'prop-types';
import CoverImg from './components/CoverImg';
import {RichText} from 'prismic-reactjs';
import GoDownLink from './components/GoDownLink';
import {useTextLabels} from '../../hooks/appData';
import CoverEngineTypesImgList from './components/CoverEngineTypesImgList';

export default function YachtCover({block, showDownArrow, blockIndex}) {
	const {textLabels} = useTextLabels();

	return (
		<section className="cover cover_first"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
		>
			<div className="cover__wrapper">
				<div className="cover__bg-img">
					<CoverImg image={block.image} />
				</div>
				<div className="cover__content">
					<div className="container">
						<h2 className="cover__title cover__title_sm">{RichText.asText(block.title)}</h2>
						<div className="cover__subtitle cover__subtitle_roundhand">{RichText.asText(block.text)}</div>
						<div className="detailed detailed_horizontal">
							<div className="detailed__title">{textLabels.all_our_models_available_as}</div>
							<CoverEngineTypesImgList />
						</div>
						{showDownArrow && <GoDownLink blockIndex={blockIndex} />}
					</div>
				</div>
			</div>
		</section>
	);
}

YachtCover.propTypes = {
	block: coverBlock().isRequired,
	showDownArrow: PropTypes.bool,
	blockIndex: PropTypes.number.isRequired
};