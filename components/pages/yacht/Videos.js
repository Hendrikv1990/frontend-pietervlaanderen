import {yachtPagePropType} from '../../../propTypes/yacht';
import {useTextLabels} from '../../../hooks/appData';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import ResolvedLink from '../../ResolvedLink';
import PropTypes from 'prop-types';
import AsText from '../../AsText';

export default function YachtVideos({yacht, blockIndex}) {
	const {textLabels} = useTextLabels();
	const videoLines = yacht.group_videos.reduce((accumulator, currentValue) => {
		if (Array.isArray(currentValue.embed_video)) {
			if (!accumulator.length || accumulator[accumulator.length - 1].length == 2) {
				accumulator.push([]);
			}

			accumulator[accumulator.length - 1].push(currentValue);
		}

		return accumulator;
	}, []);

	if (!videoLines.length)
		return null;

	return (
		<section className="section"
				 id={`section-key-${blockIndex}`}
				 data-section={blockIndex}
				 data-section-color={'black'}
		>
			<div className="container">
				<div className="section__header">
					<div className="h2">{textLabels.videos_label}</div>
				</div>
				<div className="section__body">
					<div className="videos">
						{videoLines.map((line, i) => (
							<div key={i}
									 className="videos__line flex flex_fs_s"
							>
								{line.map((video, j) => (
									<div key={j}
											 className="col_6">
										<div className="videos__item">
											<ResolvedHtmlField content={video.embed_video} />
										</div>
									</div>
								))}
							</div>
						))}
					</div>
					<div className="text-block show_sm">
						<div className="container">
							<div className="title">
								<AsText value={yacht.video_mobile_promo_header} />
							</div>
							<div className="sub">
								<AsText value={yacht.video_mobile_promo_sub} />
							</div>
							<ResolvedLink link={textLabels.get_in_touch_link}
														aAttrs={{className: 'btn btn_big'}}
							>
								{textLabels.get_in_touch_label}
							</ResolvedLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

YachtVideos.propTypes = {
	yacht: yachtPagePropType().isRequired,
	blockIndex: PropTypes.number.isRequired
};