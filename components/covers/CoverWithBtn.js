import {coverBlock} from '../../propTypes/covers';
import CoverImg from './components/CoverImg';
import {RichText} from 'prismic-reactjs';
import ResolvedLink from '../ResolvedLink';
import PropTypes from 'prop-types';
import GoDownLink from './components/GoDownLink';

export default function	CoverWithBtn(props) {
	const {block, showDownArrow, blockIndex} = props;

	return (
		<section className="cover"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
		>
			<div className="cover__wrapper">
				<div className="cover__bg-img">
					<CoverImg image={block.image} />
				</div>
				{/*<div class="cover__shadow"></div>*/}
				<div className="cover__content">
					<div className="container">
						<h2 className="cover__title">
							{RichText.asText(block.title)}
						</h2>
						<div className="cover__subtitle">
							{RichText.asText(block.text)}
						</div>
						<ResolvedLink link={block.link}
													aAttrs={{className: 'btn'}}
						>
							{RichText.asText(block.link_label)}
						</ResolvedLink>
						{showDownArrow && <GoDownLink blockIndex={blockIndex} />}
					</div>
				</div>
			</div>
		</section>
	);
}

CoverWithBtn.propTypes = {
	block: coverBlock().isRequired,
	showDownArrow: PropTypes.bool,
	blockIndex: PropTypes.number.isRequired
};