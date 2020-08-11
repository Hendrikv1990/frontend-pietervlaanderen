import {coverBlock} from '../../propTypes/covers';
import PropTypes from 'prop-types';
import CoverImg from './components/CoverImg';
import {RichText} from 'prismic-reactjs';

export default function	CoverWithCenteredText({block, blockIndex}) {
	return (
		<section className="cover cover_center"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
		>
			<div className="cover__wrapper">
				<div className="cover__bg-img">
					<CoverImg image={block.image} />
				</div>
				<div className="cover__content">
					<div className="container">
						<h2 className="cover__title">
							{RichText.asText(block.title)}
						</h2>
						<div className="cover__subtitle">
							{RichText.asText(block.text)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

CoverWithCenteredText.propTypes = {
	block: coverBlock().isRequired,
	blockIndex: PropTypes.number.isRequired
};