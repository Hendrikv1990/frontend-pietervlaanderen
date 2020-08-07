import {useState, useEffect} from 'react';
import {yachtPagePropType} from '../../../../propTypes/yacht';
import {useTextLabels} from '../../../../hooks/appData';
import clsx from 'clsx';
import {Swiper, SwiperSlide} from 'swiper/react';
import TechSpecsTable from './techSpecs/Table';
import AfterTable from './techSpecs/AfterTable';
import ImagePreloader from 'image-preloader';
import AsText from '../../../AsText';

export default function TechSpecs({yacht}) {
	const [systemOfMeasurement, setSystemOfMeasurement] = useState('metric');
	const [activeTab, setActiveTab] = useState(0);
	const {textLabels} = useTextLabels();

	const {
		group_technical_specs_slides: slides,
		technical_specs_slider_title: title,
		dimensions_specs: dimensions,
		accommodation_spec: accommodation,
		tanks_spec: tanks
	} = yacht;

	const systemOfMeasurements = {
		imperial: textLabels.imperial_label,
		metric: textLabels.metric_label,
	};

	function onChangeSystemOfMeasurementsClicked(system, e) {
		e.preventDefault();

		const newSystem = Object.keys(systemOfMeasurements).find((key) => systemOfMeasurement != key);
		setSystemOfMeasurement(newSystem);
	}

	useEffect(() => {
		const imgs = slides.map(({image}) => image.url);
		const preloader = new ImagePreloader();
		preloader.preload.apply(preloader, imgs);
	}, []);// eslint-disable-line

	return (
		<div className="tech-specs">
			<div className="tech-specs__img-wrapper">
				<div className="tech-specs__img-block">
					{slides.map((slide, i) => (
						<img key={i}
								 className={clsx('tech-specs__img', {visible: i === activeTab})}
								 src={slide.image.url} alt={slide.image.alt}
						/>
					))}
				</div>
			</div>

			<div className="container">
				<div className="flex flex_fe_c">
					<div className="tech-specs__table-block">
						<div className="tech-specs__title flex flex_sb_c">
							<h2 className="h2"><AsText value={title} /></h2>
							<div className="switch flex flex_c_c flex_xs_column">
								{Object.keys(systemOfMeasurements).map((key, i) => (
									<a href="#"
										 key={i}
										 className={clsx('switch__item', {'is-active': key === systemOfMeasurement})}
										 onClick={onChangeSystemOfMeasurementsClicked.bind(this, key)}
									>
										{systemOfMeasurements[key]}
									</a>
								))}
							</div>
						</div>
						<div className="tabs">
							<div className="tabs__tabs">
								<Swiper
									slidesPerView={'auto'}
									grabCursor={true}
									watchOverflow={false}
									spaceBetween={30}
									breakpoints={{
										576: {spaceBetween: 30},
										768: {spaceBetween: 40}
									}}
								>
									{slides.map((slide, i) => (
										<SwiperSlide key={i}>
											<a key={i}
												 className={clsx('tabs__tab-item', {'is-active': i === activeTab})}
												 onClick={(e) => {e.preventDefault();setActiveTab(i);}}
											>
												<AsText value={slide.title} />
											</a>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
							<div className="tabs__content">
								<div className={clsx('tabs__content-item', {'is-active': activeTab === 0})}>
									{Array.isArray(dimensions) && dimensions.length
									&&
									<>
										<TechSpecsTable table={convert2Table(dimensions, 'dimensions')}
																			 systemOfMeasurement={systemOfMeasurement}
										/>
										<AfterTable />
									</>
									}
								</div>
								<div className={clsx('tabs__content-item', {'is-active': activeTab === 1})}>
									{Array.isArray(accommodation) && accommodation.length
									&&
									<>
										<TechSpecsTable table={convert2Table(accommodation, 'accommodation')}
																		systemOfMeasurement={systemOfMeasurement}
										/>
										<AfterTable />
									</>
									}
								</div>
								<div className={clsx('tabs__content-item', {'is-active': activeTab === 2})}>
									{Array.isArray(tanks) && tanks.length
									&&
									<>
										<TechSpecsTable table={convert2Table(tanks, 'tank')}
																		systemOfMeasurement={systemOfMeasurement}
										/>
										<AfterTable />
									</>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

TechSpecs.propTypes = {
	yacht: yachtPagePropType().isRequired
};

function convert2Table(arrayOfValue, keyPrefix) {
	return arrayOfValue.map((row) => {
		return {
			title: row[`${keyPrefix}_characteristic_title`],
			imperial_value: row[`${keyPrefix}_imperial_value`],
			metric_value: row[`${keyPrefix}_metric_value`]
		};
	});
}