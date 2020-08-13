import {propulsionPagePropType} from '../../../propTypes/propulsion';
import PropTypes from 'prop-types';
import {getSectionIdByIndex, isRichEmpty} from '../../../lib/utils';
import {useTextLabels} from '../../../hooks/appData';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import clsx from 'clsx';
import {useState} from 'react';
import PropulsionTechSlider from '../yacht/propulsion/TechSlider';
import _isEmpty from 'lodash/isEmpty';
import ResolvedLink from '../../ResolvedLink';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function PropulsionElectricSection({blockIndex, propulsionPage, yachtsData}) {
	const {textLabels} = useTextLabels();
	const firstYachtUId = propulsionPage.yachts_menu[0]?.yacht._meta.uid;
	const [electricActiveYacht, setElectricActiveYacht] = useState(firstYachtUId);

	return (
		<section className="section section_propulsion propulsion"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
						 data-section-color={'black'}
		>
			<div className="propulsion__wrapper">
				<div className="container">
					<div className="propulsion__title flex flex_sb_c flex_md_column flex_md_fs-fe">
						<div className="title-block title-block_left">
							<h3 className="h3"><AsText value={propulsionPage.electric_technology_title} /></h3>
							<div className="title-block__sub-title no-last-margin">
								<ResolvedHtmlField content={propulsionPage.electric_technology_body} />
							</div>
						</div>
						<div className="partnership flex flex_column flex_fs_fe flex_md_fs-fe">
							<div className="partnership__title">{textLabels.in_partnership_with}</div>
							<img src={require('../../../assets/img/torgeedo-logo.png')}
									 alt="Torgeedo"
									 className="partnership__logo" />
						</div>
					</div>
					<div className="section__menu flex flex_fe_c flex_md_column flex_md_fs-fs">
						<div className="top-menu">
							<Swiper
								slidesPerView={'auto'}
								grabCursor={true}
								watchOverflow={true}
								spaceBetween={47}
								breakpoints={{
									576: {spaceBetween: 47}
								}}
							>
								{propulsionPage.yachts_menu.map(({yacht: {_meta}}, i) => (
									<SwiperSlide key={i}>
										<div className="top-menu__item">
											<a href="#"
												 className={clsx('top-menu__link top-menu__link_gray', {active: _meta.uid === electricActiveYacht})}
												 onClick={(e) => {e.preventDefault();setElectricActiveYacht(_meta.uid);}}
											>
												<AsText value={yachtsData[_meta.uid].title} />
											</a>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
					{electricActiveYacht && !_isEmpty(yachtsData[electricActiveYacht].group_electric_technical_slides) &&
						<PropulsionTechSlider slides={yachtsData[electricActiveYacht].group_electric_technical_slides}
																	thumbTabsClasses={'tabs__tabs_blue'}
						/>
					}

					{!isRichEmpty(propulsionPage.customised_proposal) &&
						<div className="propulsion__footer">
							<div className="flex flex_fe_c hide_sm">
								<div className="text no-last-margin">
									<ResolvedHtmlField content={propulsionPage.customised_proposal} />
								</div>
								{textLabels.contact_us_label && textLabels.contact_us_link &&
									<ResolvedLink link={textLabels.contact_us_link}
																aAttrs={{className: 'btn btn_xs btn_border btn_width_auto'}}
									>
										{textLabels.contact_us_label}
									</ResolvedLink>
								}
							</div>
						</div>
					}
				</div>
			</div>
		</section>
	);
}

PropulsionElectricSection.propTypes = {
	propulsionPage: propulsionPagePropType().isRequired,
	yachtsData: PropTypes.object.isRequired,
	blockIndex: PropTypes.number
};