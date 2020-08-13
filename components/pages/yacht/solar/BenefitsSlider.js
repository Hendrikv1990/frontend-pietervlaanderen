import {useState} from 'react';
import {solarTechSlidePropType} from '../../../../propTypes/yacht';
import AsText from '../../../AsText';
import ResolvedHtmlField from '../../../ResolvedHtmlField';
import {Swiper, SwiperSlide} from 'swiper/react';
import clsx from 'clsx';
import {propulsionTechSlidePropType} from '../../../../propTypes/yacht';
import PropTypes from 'prop-types';
import {getIconsBySlide} from '../../../../lib/utils';
import _isEmpty from 'lodash/isEmpty';

export default function SolarBenefitsSlider({slides, afterTitleInsertion, optionsTabsClasses}) {
	const [swiper, setSwiper] = useState(null);
	const [activeSlide, setActiveSlide] = useState(0);

	if (_isEmpty(slides))
		return null;

	function onChangeSlideLinkClicked(i, e) {
		e.preventDefault();

		if (swiper)
			swiper.slideTo(i);
	}

	return (
		<div className={'solar-benefits-slider'}>
			<div className="solar">
				<div className="container">
					<div className="tabs tabs_solar">
						<div className="tabs__content">
							{slides.map((slide, i) => (
								<div key={i}
										 className={clsx('tabs__content-item', {'is-active': activeSlide === i})}
								>
									<div className="solar__title">
										<div className="title-block title-block_left">
											<h2 className="h2"><AsText value={slide.title} /></h2>
											<div className="title-block__sub-title no-last-margin">
												<ResolvedHtmlField content={slide.description} />
											</div>
										</div>
									</div>
								</div>
							))}
							{afterTitleInsertion}
							<Swiper
								spaceBetween={0}
								slidesPerView={1}
								grabCursor={true}
								onSwiper={setSwiper}
								onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
							>
								{slides.map((slide, i) => (
									<SwiperSlide key={i}>
										<div className="tabs__content-item is-active">
											{slide.image?.url &&
											<div className="tabs__img-block flex flex_c_c">
												<img className="tabs__content-img"
														 src={slide.image.url}
														 alt={slide.image.alt} />
											</div>
											}
											<OptionsTabs slides={slides}
																	 onClick={onChangeSlideLinkClicked}
																	 activeSlide={activeSlide}
																	 className={clsx('show_md')}
											/>
											<div className="icons-block flex flex_sa_fs flex_wrap">
												{getIconsBySlide(slide, 4).map((icon, i) => (
													<div key={i}
															 className="icons-block__item icons-block__item_big"
													>
														<div className="icons-block__ico">
															<img src={icon.icon.url} alt={icon.icon.alt} />
														</div>
														<div className="icons-block__title">
															<AsText value={icon.subtitle} />
														</div>
														<div className="icons-block__descr">
															<AsText value={icon.description} />
														</div>
													</div>
												))}
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<OptionsTabs slides={slides}
												 onClick={onChangeSlideLinkClicked}
												 activeSlide={activeSlide}
												 className={clsx('hide_md', optionsTabsClasses)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

SolarBenefitsSlider.propTypes = {
	slides: PropTypes.arrayOf(
		solarTechSlidePropType()
	),
	afterTitleInsertion: PropTypes.node,
	optionsTabsClasses: PropTypes.string
};

function OptionsTabs({slides, activeSlide, onClick, className}) {
	return (
		<div className={clsx('tabs__tabs', className)}>
			{slides.map((slide, i) => (
				<a key={i}
					 className={clsx('tabs__tab-item', {'is-active': i === activeSlide})}
					 href={'#'}
					 onClick={onClick.bind(this, i)}
				>
					<AsText value={slide.option} />
				</a>
			))}
		</div>
	);
}

OptionsTabs.propTypes = {
	slides: PropTypes.arrayOf(
		propulsionTechSlidePropType()
	).isRequired,
	activeSlide: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string
};