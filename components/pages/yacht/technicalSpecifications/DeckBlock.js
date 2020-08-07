import {useState, useEffect} from 'react';
import clsx from 'clsx';
import {Swiper, SwiperSlide} from 'swiper/react';
import {RichText} from 'prismic-reactjs';
import {yachtPagePropType} from '../../../../propTypes/yacht';
import ImagePreloader from 'image-preloader';

export default function DeckBlock({yacht}) {
	const deckTabs = Array.isArray(yacht.group_technical_specs_perspective_slides) ? yacht.group_technical_specs_perspective_slides : [];
	const [activeDeckTab, setActiveDeckTab] = useState(0);

	useEffect(() => {
		const imgs = deckTabs.map(({image: {url}}) => url);

		const preloader = new ImagePreloader();
		preloader.preload.apply(preloader, imgs);
	}, []);// eslint-disable-line

	return (
		<div className={'deck-block'}>
			<div className={'container'}>
				<div className="tabs">
					<div className="tabs__content">
						{deckTabs.map((tab, i) => (
							<div key={i}
									 className={clsx('tabs__content-item', {'is-active': activeDeckTab === i})}
							>
								<img className="tabs__img" src={tab.image.url} alt={tab.image.alt} />
							</div>
						))}
					</div>
					<div className="tabs__tabs tabs__tabs_bottom">
						<Swiper
							slidesPerView={'auto'}
							grabCursor={true}
							watchOverflow={true}
							spaceBetween={30}
							breakpoints={{
								576: {spaceBetween: 80}
							}}
						>
							{deckTabs.map((tab, i) => (
								<SwiperSlide key={i}>
									<a key={i}
										 className={clsx('tabs__tab-item', {'is-active': activeDeckTab === i})}
										 href={'#'}
										 onClick={(e) => {e.preventDefault();setActiveDeckTab(i);}}
									>
										{RichText.asText(tab.option)}
									</a>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
}

DeckBlock.propTypes = {
	yacht: yachtPagePropType().isRequired
};