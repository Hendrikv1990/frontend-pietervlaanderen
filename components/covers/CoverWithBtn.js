import {coverBlock} from '../../propTypes/covers';
import CoverImg from './components/CoverImg';
import ResolvedLink from '../ResolvedLink';
import PropTypes from 'prop-types';
import GoDownLink from './components/GoDownLink';
import AsText from '../AsText';
import Fullpage, { FullPageSections, FullpageSection } from '@ap.cx/react-fullpage'

export default function	CoverWithBtn(props) {
	const {block, showDownArrow, blockIndex} = props;

	return (
		<FullpageSection style={{

		}}>
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
							<AsText value={block.title} />
						</h2>
						<div className="cover__subtitle">
							<AsText value={block.text} />
						</div>
						<ResolvedLink link={block.link}
													aAttrs={{className: 'btn'}}
						>
							<AsText value={block.link_label} />
						</ResolvedLink>
						{showDownArrow && <GoDownLink blockIndex={blockIndex} />}
					</div>
				</div>
			</div>
		</section>
		</FullpageSection>
	);
}

CoverWithBtn.propTypes = {
	block: coverBlock().isRequired,
	showDownArrow: PropTypes.bool,
	blockIndex: PropTypes.number.isRequired
};