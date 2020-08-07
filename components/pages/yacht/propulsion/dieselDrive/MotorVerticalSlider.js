import {useState, useRef} from 'react';
import {yachtPagePropType} from '../../../../../propTypes/yacht';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Controller, Thumbs} from 'swiper';
import clsx from 'clsx';
import AsText from '../../../../AsText';
import ResolvedHtmlField from '../../../../ResolvedHtmlField';
SwiperCore.use([Pagination, Controller, Thumbs]);

export default function MotorVerticalSlider({yacht}) {
	const [motorImgSwiper, setMotorImgSwiper] = useState(null);// eslint-disable-line
	const [descriptionSwiper, setDescriptionSwiper] = useState(null);
	const $tabDots = useRef(null);

	let {
		group_engine_technical_slides: engineSlides,
	} = yacht;
	if (!Array.isArray(engineSlides))
		engineSlides = [];

	return (
		<div className={'motors-vertical'}>
			<div className="tabs tabs_diesel flex flex_fs_s flex_md_column">
				<div className="tabs__content">
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						grabCursor={true}
						pagination={{
							el: $tabDots.current,
							clickable: true,
							bulletElement: 'a',
							bulletClass: 'tabs__dot',
							bulletActiveClass: 'is-active'
						}}
						onSwiper={setMotorImgSwiper}
						// controller={{control: descriptionSwiper}}
						thumbs={{ swiper: descriptionSwiper }}
					>
						{engineSlides.map((slide, i) => (
							<SwiperSlide key={i}>
								<img className="tabs__content-img"
										 src={slide.image.url}
										 alt={slide.image.alt} />
							</SwiperSlide>
						))}
					</Swiper>
					<div className="tabs__dots flex flex_c_c"
							 ref={$tabDots}
					></div>
				</div>
				<div className="tabs__tabs">
					<Swiper
						slidesPerView={'auto'}
						grabCursor={true}
						watchOverflow={true}
						spaceBetween={30}
						onSwiper={setDescriptionSwiper}
						// controller={{control: motorImgSwiper}}
					>
						{engineSlides.map((slide, i) => (
							<SwiperSlide key={i}>
								<div key={i}
										 className={clsx('tabs__tab-item')}
								>
									<div className="tabs__logo-block">
									{slide.manufacture_logo &&
									<img src={slide.manufacture_logo.url} className="tabs__logo" />
									}
									</div>
									<div className="tabs__title">
										<h3 className="h3"><AsText value={slide.title} /></h3>
										<div className="tabs__sub-title">
											<ResolvedHtmlField content={slide.description} />
										</div>
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

MotorVerticalSlider.propTypes = {
	yacht: yachtPagePropType().isRequired
};