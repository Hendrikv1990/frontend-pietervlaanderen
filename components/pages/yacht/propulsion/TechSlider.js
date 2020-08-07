import {useState, useEffect} from 'react';
import {propulsionTechSlidePropType} from '../../../../propTypes/yacht';
import PropTypes from 'prop-types';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Thumbs} from 'swiper';
import AsText from '../../../AsText';
import clsx from 'clsx';
import ImagePreloader from 'image-preloader';
import {getIconsBySlide} from '../../../../lib/utils';

SwiperCore.use([Thumbs]);

export default function PropulsionTechSlider({slides, thumbTabsClasses}) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		const imgs = slides.map(({image: {url}}) => url);
		const preloader = new ImagePreloader();
		preloader.preload.apply(preloader, imgs);
	}, []);// eslint-disable-line

	return (
		<div className={'propulsion-tech-slider'}>
			<div className="tabs tabs_hybrid flex flex_fs_s flex_column">
				<div className="tabs__content">
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						grabCursor={true}
						thumbs={{swiper: thumbsSwiper}}
						onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
					>
						{slides.map((slide, i) => (
							<SwiperSlide key={i}>
								<div className="tabs__content-item is-active">
									<div className="tabs__img-block flex flex_c_c">
										<img className="tabs__content-img" src={slide.image.url} alt={slide.image.alt} />
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className={clsx('tabs__tabs', thumbTabsClasses)}>
					<Swiper
						slidesPerView={'auto'}
						grabCursor={true}
						onSwiper={setThumbsSwiper}
						spaceBetween={30}
						breakpoints={{
							992: {spaceBetween: 0}
						}}
					>
						{slides.map((slide, i) => (
							<SwiperSlide key={i}>
								<div className={clsx('tabs__tab-item', {'is-active': activeSlide === i})}>
									<div className="tabs__title">
										<AsText value={slide.title} />
									</div>
									<div className="icons-block flex flex_md_column">
										{getIconsBySlide(slide, 3).map((icon, i) => (
											<div key={i} className={'icons-block__item'}>
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
			</div>
		</div>
	);
}

PropulsionTechSlider.propTypes = {
	slides: PropTypes.arrayOf(
		propulsionTechSlidePropType()
	).isRequired,
	thumbTabsClasses: PropTypes.string
};