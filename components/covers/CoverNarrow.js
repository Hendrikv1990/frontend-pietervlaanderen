import {coverBlock} from '../../propTypes/covers';
import PropTypes from 'prop-types';
import {getSectionIdByIndex} from '../../lib/utils';
import CoverImg from './components/CoverImg';
import AsText from '../AsText';

export default function	CoverNarrow({blockIndex, block}) {
	return (
		<section className="cover cover_narrow"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
		>
			<div className="cover__wrapper">
				<div className="cover__bg-img">
					<CoverImg image={block.image} />
				</div>
				<div className="cover__content">
					<div className="container flex flex_column flex_c_c">
						<h2 className="cover__title">
							<AsText value={block.title} />
						</h2>
						<div className="cover__subtitle cover__subtitle_roundhand">
							<AsText value={block.text} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

CoverNarrow.propTypes = {
	block: coverBlock().isRequired,
	blockIndex: PropTypes.number
};