import {Component, createRef} from 'react';
import {yachtPagePropType} from '../../../../../propTypes/yacht';
import AsText from '../../../../AsText';
import ResolvedHtmlField from '../../../../ResolvedHtmlField';
import clsx from 'clsx';

import Swiper, {Navigation} from 'swiper';

Swiper.use([Navigation]);

export default class MotorHorizontalSlider extends Component {
	constructor(props) {
		super(props);

		this.swiper = null;
		this.$slider = createRef();
		this.$sliderNext = createRef();
		this.$sliderPrev = createRef();

		this.state = {
			activeSlide: 0
		};
	}

	componentDidMount() {
		if (!this.$slider.current || !this.$sliderNext.current || !this.$sliderPrev.current)
			return;

		const that = this;
		this.swiper = new Swiper(this.$slider.current, {
			direction: 'vertical',
			grabCursor: true,
			navigation: {
				nextEl: this.$sliderNext.current,
				prevEl: this.$sliderPrev.current
			},
			on: {
				slideChange(swiper) {
					that.setState({activeSlide: swiper.activeIndex});
				}
			}
		});
	}

	componentWillUnmount() {
		if (this.swiper) {
			this.swiper.destroy();
		}
	}

	onRightLinkClicked(i, e) {
		e.preventDefault();

		if (this.swiper) {
			this.swiper.slideTo(i);
		}
	}

	render() {
		let {
			group_engine_technical_slides: engineSlides,
		} = this.props.yacht;

		if (!Array.isArray(engineSlides))
			engineSlides = [];

		const {activeSlide} = this.state;

		return (
			<div className="motors-horizontal">
				<div className="left-part-wrapper">
					<div className={'frame-wrapper'}>
						<div className="motor-vertical-slider">
							<div className="swiper-container" ref={this.$slider}>
								<div className="swiper-wrapper">
									{engineSlides.map((slide, i) => (
										<div className="swiper-slide" key={i}>
											<div className={'motor-slide'}>
												<img src={slide.image.url} alt={slide.image.alt} />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="right-part-wrapper">
					{engineSlides.map((slide, i) => (
						<a key={i}
							 className={clsx('tabs__tab-item', {'is-active': i === activeSlide})}
							 onClick={this.onRightLinkClicked.bind(this, i)}
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
						</a>
					))}
				</div>
				<div className="tabs__switcher">
					<a href="#"
						 className="tabs__btn tabs__btn_prev" ref={this.$sliderPrev}
					></a>
					<a href="#"
						 className="tabs__btn tabs__btn_next" ref={this.$sliderNext}
					></a>
				</div>
			</div>
		);
	}
}

MotorHorizontalSlider.propTypes = {
	yacht: yachtPagePropType().isRequired
};