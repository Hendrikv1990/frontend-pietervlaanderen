import {useState} from 'react';
import EngineTypesImgsList from './EngineTypesImgsList';
import {yachtPagePropType} from '../../../../propTypes/yacht';
import AsText from '../../../AsText';
import ResolvedHtmlField from '../../../ResolvedHtmlField';
import {useTextLabels} from '../../../../hooks/appData';
import clsx from 'clsx';
import PropulsionTechSlider from './TechSlider';
import {RichText} from 'prismic-reactjs';

export default function HybridDrive({yacht}) {
	const {textLabels} = useTextLabels();
	const [videoIsOpened, setVideoIsOpened] = useState(false);

	return (
		<div className="propulsion__wrapper hybrid-drive">
			<div className="container">
				<EngineTypesImgsList classAddons={{hybrid: 'detailed__svg_dark'}} />
				<div className="propulsion__title">
					<div className="title-block title-block_left">
						<h3 className="h3">
							<AsText value={yacht.hybrid_title} />
						</h3>
						<div className="title-block__sub-title">
							<ResolvedHtmlField content={yacht.hybrid_description} />
						</div>
						<a href="#"
							 className="link link_video"
							 onClick={(e) => {e.preventDefault();setVideoIsOpened(!videoIsOpened);}}
						>
							{textLabels.how_it_works_watch_video}
						</a>
						{Array.isArray(yacht.propulsion_how_it_works_video) && yacht.propulsion_how_it_works_video.length &&
						<div className={clsx('how-it-works-video', {opened: videoIsOpened})}>
							<RichText
								render={yacht.propulsion_how_it_works_video}
							/>
						</div>
						}
					</div>
				</div>
				<PropulsionTechSlider slides={yacht.group_hybrid_technical_slides} />
			</div>
		</div>
	);
}

HybridDrive.propTypes = {
	yacht: yachtPagePropType().isRequired
};