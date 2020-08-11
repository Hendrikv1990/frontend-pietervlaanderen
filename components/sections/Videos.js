import PropTypes from 'prop-types';
import {getSectionIdByIndex} from '../../lib/utils';
import AsText from '../AsText';
import ResolvedHtmlField from '../ResolvedHtmlField';

export default function VideosSection({title, video, blockIndex}) {
	return (
		<section className="section section_video"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
		>
			<div className="container">
				<div className="section__header">
					<h2 className="h2">
						<AsText value={title} />
					</h2>
				</div>
				<div className="section__body">
					<div className="videos">
						<div className="videos__wrapper">
							<div className="videos__item">
								<ResolvedHtmlField content={video} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

VideosSection.propTypes = {
	title: PropTypes.array,
	video: PropTypes.array,
	blockIndex: PropTypes.number
};