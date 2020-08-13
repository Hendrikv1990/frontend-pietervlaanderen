import {propulsionPagePropType} from '../../../propTypes/propulsion';
import PropTypes from 'prop-types';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import {useTextLabels} from '../../../hooks/appData';
import {useState} from 'react';
import _isEmpty from 'lodash/isEmpty';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {RichText} from 'prismic-reactjs';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropulsionTechSlider from '../yacht/propulsion/TechSlider';
import clsx from 'clsx';
import {getSectionIdByIndex} from '../../../lib/utils';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function PropulsionHybridSection({propulsionPage, yachtsData, blockIndex}) {
	const firstYachtUId = propulsionPage.yachts_menu[0]?.yacht._meta.uid;
	const [hybridActiveYacht, setHybridActiveYacht] = useState(firstYachtUId);

	return (
		<section className="section section_propulsion propulsion"
						 id={blockIndex ? getSectionIdByIndex(blockIndex) : null}
						 data-section={blockIndex ? blockIndex : null}
						 data-section-color={'black'}
		>
			<div className="propulsion__wrapper">
				<div className="container">
					<div className="propulsion__title">
						<div className="title-block title-block_center">
							<h3 className="h3 h3_quote">
								<AsText value={propulsionPage.quote_title} />
							</h3>
							<div className="title-block__sub-title title-block__sub-title_center no-last-margin">
								<ResolvedHtmlField content={propulsionPage.quote_body} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="propulsion__wrapper">
				<div className="container">
					<div className="propulsion__title">
						<div className="title-block title-block_left">
							<h3 className="h3"><AsText value={propulsionPage.hybrid_technology_title} /></h3>
							<div className="title-block__sub-title no-last-margin">
								<ResolvedHtmlField content={propulsionPage.hybrid_technology_body} />
							</div>
							<div className="section__menu flex flex_sb_c flex_md_column flex_md_fs-fs">
								<PropulsionHowItWorksVideo how_it_works_video={propulsionPage.how_it_works_video} />
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
														 className={clsx('top-menu__link top-menu__link_gray', {active: _meta.uid === hybridActiveYacht})}
														 onClick={(e) => {e.preventDefault();setHybridActiveYacht(_meta.uid);}}
													>
														<AsText value={yachtsData[_meta.uid].title} />
													</a>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>
						</div>
					</div>
					{hybridActiveYacht &&
						<PropulsionTechSlider slides={yachtsData[hybridActiveYacht].group_hybrid_technical_slides} />
					}
				</div>
			</div>
		</section>
	);
}

PropulsionHybridSection.propTypes = {
	propulsionPage: propulsionPagePropType().isRequired,
	yachtsData: PropTypes.object.isRequired,
	blockIndex: PropTypes.number
};

function PropulsionHowItWorksVideo({how_it_works_video}) {
	const {textLabels} = useTextLabels();
	const [videoIsOpened, setVideoIsOpened] = useState(false);

	const closeVideoModal = () => setVideoIsOpened(false);
	const onClick = (e) => {
		e.preventDefault();
		setVideoIsOpened(true);
	};

	return (
		<>
			<a href="#"
				 className="link link_video"
				 onClick={onClick}
			>
				<AsText value={textLabels.how_it_works_watch_video} />
			</a>
			{!_isEmpty(how_it_works_video) &&
			<Dialog
				open={videoIsOpened}
				onClose={closeVideoModal}
			>
				<DialogTitle>{textLabels.how_it_works_watch_video}</DialogTitle>
				<DialogContent>
					<RichText
						render={how_it_works_video}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeVideoModal} color="primary">
						{textLabels.close}
					</Button>
				</DialogActions>
			</Dialog>
			}
		</>
	);
}

PropulsionHowItWorksVideo.propTypes = {
	how_it_works_video: PropTypes.array
};