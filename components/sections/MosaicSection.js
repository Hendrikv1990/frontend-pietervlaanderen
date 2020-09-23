import PropTypes from 'prop-types';
import {getSectionIdByIndex} from '../../lib/utils';
import AsText from '../AsText';
import {imagePropType} from '../../propTypes/common';
import ResolvedHtmlField from '../ResolvedHtmlField';
import ScrollAnimation from 'react-animate-on-scroll';


export default function MosaicSection({blockIndex, listNumber, title, grid}) {
	return (
		<section className="mosaic"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
		>
			<div className="container">
				<div className="mosaic__title">
					<ScrollAnimation animateIn='animate__fadeInDown'
													 animateOut='animate__fadeInDown'>
					<div className="gallery-list__number">{listNumber}</div>
					</ScrollAnimation>

					<ScrollAnimation animateIn='animate__fadeInDown'
													 animateOut='animate__fadeInDown'>
					<h2 className="h2">
						<AsText value={title} />
					</h2>
					</ScrollAnimation>
				</div>
				<div className="mosaic__wrapper">
					<div className="mosaic__grid">
						{grid.map((item, i) => (
							<div key={i}
									 className={`mosaic__item mosaic__item_${(i + 1)}`}
							>
								<div className="mosaic__img-block">
									<div className="mosaic__img-wrap">
										<img className="mosaic__img"
												 src={item.image_1.slide?.url}
												 alt={item.image_1.alt}
										/>
									</div>
								</div>
								<div className="mosaic__descr">
									<ScrollAnimation animateIn='animate__fadeInDown'
																	 animateOut='animate__fadeInDown'>
									<img src={item.icon.url}
											 alt={item.icon.alt}
											 className="mosaic__ico"
									/>
									</ScrollAnimation>
									<ScrollAnimation animateIn='animate__fadeInDown'
																	 animateOut='animate__fadeInDown'>
									<h4 className="mosaic__name h4">
										<AsText value={item.title} />
									</h4>
									</ScrollAnimation>
									<ScrollAnimation animateIn='animate__fadeIn'
																	 animateOut='animate__fadeIn'>
									<div className="mosaic__text no-last-margin">
										<ResolvedHtmlField content={item.description} />
									</div>
									</ScrollAnimation>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

MosaicSection.propTypes = {
	blockIndex: PropTypes.number,
	listNumber: PropTypes.string,
	title: PropTypes.array,
	grid: PropTypes.arrayOf(
		PropTypes.shape({
			icon: imagePropType(),
			image_1: imagePropType(),
			title: PropTypes.array,
			description: PropTypes.array
		})
	)
};