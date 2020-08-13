import {useState} from 'react';
import EngineTypesImgsList from './EngineTypesImgsList';
import {yachtPagePropType} from '../../../../propTypes/yacht';
import AsText from '../../../AsText';
import ResolvedHtmlField from '../../../ResolvedHtmlField';
import {useTextLabels} from '../../../../hooks/appData';
import PropulsionTechSlider from './TechSlider';
import {RichText} from 'prismic-reactjs';
import _isEmpty from 'lodash/isEmpty';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function HybridDrive({yacht}) {
	const {textLabels} = useTextLabels();
	const [videoIsOpened, setVideoIsOpened] = useState(false);
	const closeVideoModal = () => setVideoIsOpened(false);

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
						{!_isEmpty(yacht.propulsion_how_it_works_video) &&
						<Dialog
							open={videoIsOpened}
							onClose={closeVideoModal}
						>
							<DialogTitle>{textLabels.how_it_works_watch_video}</DialogTitle>
							<DialogContent>
								<RichText
									render={yacht.propulsion_how_it_works_video}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={closeVideoModal} color="primary">
									{textLabels.close}
								</Button>
							</DialogActions>
						</Dialog>
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