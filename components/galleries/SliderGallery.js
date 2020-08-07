import {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from 'swiper';

SwiperCore.use([Pagination, Navigation]);

export default function SliderGallery({slides}) {
	const $pagination = useRef(null);
	const $prev = useRef(null);
	const $next = useRef(null);
	const [swiper, setSwiper] = useState(null);

	//pagination has a bug in a functional implementaion - need to update manually to have pagination
	useEffect(() => {
		if ($pagination.current && $prev.current && $next.current && swiper) {
			swiper.update();
		}
	}, [swiper]);

	return (
		<div className="gallery">
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				grabCursor={true}
				pagination={{
					el: $pagination.current,
					clickable: true,
					bulletElement: 'a',
					bulletClass: 'gallery__dot',
					bulletActiveClass: 'is-active'
				}}
				navigation={{
					nextEl: $next.current,
					prevEl: $prev.current
				}}
				onSwiper={setSwiper}
			>
				{slides.map((slide, i) => (
					<SwiperSlide key={i}>
						<div className="gallery__img-block">
							<img src={slide.image?.slider?.url} alt={slide.image?.alt} className="gallery__img"/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="gallery__dots flex flex_c_c"
				 ref={$pagination}
			></div>
			<div className="gallery__btns flex flex_fs_s hide_sm">
				<a className="gallery__btn gallery__btn_prev flex flex_c_c"
					 href="#"
					 ref={$prev}
				>
					<svg viewBox="0 0 37 15">
						<path d="m 35.559034,7.5 h -33.75"/>
						<path d="m 8.707034,14 -7.398,-6.5 7.398,-6.5"/>
					</svg>
				</a>
				<a className="gallery__btn gallery__btn_next flex flex_c_c"
					 href="#"
					 ref={$next}
				>
					<svg viewBox="0 0 37 15">
						<path d="M 1,7.5 H 34.75" strokeWidth="1.20000005"/>
						<path d="M 27.852,14 35.25,7.5 27.852,1" strokeWidth="1.20000005"/>
					</svg>
				</a>
			</div>
		</div>
	);
}

SliderGallery.propTypes = {
	slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.shape({
				alt: PropTypes.string,
				url: PropTypes.string,
				slider: PropTypes.shape({
					url: PropTypes.string
				}).isRequired
			}).isRequired,
			title: PropTypes.array
		})
	).isRequired
};