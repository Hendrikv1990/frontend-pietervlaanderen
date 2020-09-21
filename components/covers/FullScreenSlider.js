import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {fullScreeSlidePropTypes} from '../../propTypes/covers';
import {RichText} from 'prismic-reactjs';
import FullScreenSliderSlide from './FullScreenSlider/Slide';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination} from 'swiper';
import ImagePreloader from 'image-preloader';
import GoDownLink from './components/GoDownLink';

SwiperCore.use([Pagination]);

export default function FullScreenSlider(props) {
	const {slides, showDownArrow, blockIndex} = props;

	useEffect(() => {
		const imgs = slides.reduce((accumulator, slide) => {
			accumulator.push(slide.image.url);

			['main', 'md', 'sm', 'xs'].forEach((size) => {
				if (size in slide.image) {
					accumulator.push(slide.image[size].url);
				}
			});

			return accumulator;
		}, []);

		const preloader = new ImagePreloader();
		preloader.preload.apply(preloader, imgs);
	}, []);// eslint-disable-line

	return (
		<section className="slider"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
		>
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				pagination={{
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '"><span class="pagination-text">' + RichText.asText(slides[index].title) + '</span></span>';
					}
				}}
				grabCursor={true}
			>
				{slides.map((slide, i) => (
					<SwiperSlide key={i}>
						<FullScreenSliderSlide slide={slide}
																	 showDownArrow={false}
																	 blockIndex={blockIndex}
						/>
					</SwiperSlide>
				))}
				{showDownArrow &&
				<span slot="container-end">
					<GoDownLink blockIndex={blockIndex} />
				</span>
				}
			</Swiper>
		</section>
	);
}

FullScreenSlider.propTypes = {
	slides: PropTypes.arrayOf(
		fullScreeSlidePropTypes()
	).isRequired,
	showDownArrow: PropTypes.bool,
	blockIndex: PropTypes.number.isRequired
};