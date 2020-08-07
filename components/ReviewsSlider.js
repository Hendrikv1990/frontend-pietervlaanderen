import PropTypes from 'prop-types';
import {reviewPropType} from '../propTypes/common';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination} from 'swiper';
import {RichText} from 'prismic-reactjs';
import ResolvedHtmlField from './ResolvedHtmlField';
SwiperCore.use([Pagination]);

export default function ReviewsSlider({reviews, blockIndex}) {
	return (
		<section className="reviews"
						 id={`section-key-${blockIndex}`}
						 data-section={blockIndex}
						 data-section-color={'black'}
		>
			<div className="container">
				<div className="rev-slider">
					<div className="rev-slider__wrapper">
						<Swiper
							spaceBetween={0}
							slidesPerView={1}
							pagination={{
								el: `#section-key-${blockIndex} .pagination`,
								clickable: true,
								bulletElement: 'a',
								bulletClass: 'rev-slider__dot',
								bulletActiveClass: 'is-active'
							}}
							grabCursor={true}
							// autoHeight={true}
						>
							{reviews.map((review, i) => (
								<SwiperSlide key={i}>
									<div className="rev-slider__item">
										<h3 className="rev-slider__title">{RichText.asText(review.title)}</h3>
										<div className="rev-slider__author">{RichText.asText(review.reviewer)}</div>
										<div className="rev-slider__text">
											<ResolvedHtmlField content={review.review} />
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="rev-slider__dots">
						<div className="flex flex_c_c pagination"></div>
					</div>
				</div>
			</div>
		</section>
	);
}

ReviewsSlider.propTypes = {
	reviews: PropTypes.arrayOf(
		reviewPropType()
	),
	blockIndex: PropTypes.number.isRequired
};