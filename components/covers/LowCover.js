import {coverBlock} from '../../propTypes/covers';
import {RichText} from 'prismic-reactjs';
import ResolvedLink from '../ResolvedLink';
import PropTypes from 'prop-types';
import AsText from '../AsText';

export default function LowCover({block}) {
	return (
		<section className="text-block">
			<div className="container">
				<div className="title">{RichText.asText(block.title)}</div>
				<div className="sub">{RichText.asText(block.text)}</div>
				<ResolvedLink link={block.link}
											aAttrs={{className: 'btn btn_big'}}
				>
					<AsText value={block.link_label} />
				</ResolvedLink>
			</div>
		</section>
	);
}

LowCover.propTypes = {
	block: coverBlock().isRequired,
	blockIndex: PropTypes.number
};