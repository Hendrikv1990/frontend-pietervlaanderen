import {aboutPagePropType} from '../../../propTypes/about';
import {RichText} from 'prismic-reactjs';
import PropTypes from 'prop-types';

export default function StoryTimeline({aboutPage, blockIndex}) {
	return (
		<section className="section section_timeline"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
						 data-section-color={'black'}
		>
			<div className="section__header">
				<div className="container">
					<div className="title-block">
						<h2 className="h1">{RichText.asText(aboutPage.story_title)}</h2>
						<div className="title-block__sub-title">
							{RichText.asText(aboutPage.story_description)}
						</div>
					</div>
				</div>
			</div>
			<div className="section__body">
				<div className="timeline">
					<img src={aboutPage.story_image.url}
							 alt={aboutPage.story_image.alt}
							 className="timeline__img timeline__img_xl" />
					{aboutPage.story_image.md &&
						<img src={aboutPage.story_image.md.url}
								 alt={aboutPage.story_image.alt}
								 className="timeline__img timeline__img_md" />}

					{aboutPage.story_image.xs &&
						<img src={aboutPage.story_image.xs.url}
								 alt={aboutPage.story_image.alt}
								 className="timeline__img timeline__img_xs" />}
				</div>
			</div>
		</section>
	);
}

StoryTimeline.propTypes = {
	aboutPage: aboutPagePropType().isRequired,
	blockIndex: PropTypes.number.isRequired
};