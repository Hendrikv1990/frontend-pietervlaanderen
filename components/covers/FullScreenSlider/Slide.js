import CoverImg from '../components/CoverImg';
import {RichText} from 'prismic-reactjs';
import ResolvedLink from '../../ResolvedLink';
import GoDownLink from '../components/GoDownLink';
import PropTypes from 'prop-types';
import {fullScreeSlidePropTypes} from '../../../propTypes/covers';
import {useTextLabels} from '../../../hooks/appData';
import CoverEngineTypesImgList from '../components/CoverEngineTypesImgList';

export default function FullScreenSliderSlide({slide, showDownArrow, blockIndex}) {
	const {textLabels} = useTextLabels();

	return (
		<div className="slider__item">
			<div className="cover cover_first">
				<div className="cover__wrapper">
					<div className="cover__bg-img">
						<CoverImg image={slide.image} />
					</div>
					<div className="cover__shadow"></div>
					<div className="cover__content">
						<div className="container">
							<h2 className="cover__title">{RichText.asText(slide.title)}</h2>
							<ResolvedLink link={slide.link}
														aAttrs={{className: 'btn'}}
							>
								{RichText.asText(slide.link_label)}
							</ResolvedLink>
							<div className="detailed">
								<div className="detailed__title">{textLabels.all_our_models_available_as}</div>
								<CoverEngineTypesImgList />
							</div>
							{showDownArrow && <GoDownLink blockIndex={blockIndex} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

FullScreenSliderSlide.propTypes = {
	slide: fullScreeSlidePropTypes().isRequired,
	showDownArrow: PropTypes.bool,
	blockIndex: PropTypes.number.isRequired
};