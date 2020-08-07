import {Component} from 'react';
import {yachtPagePropType} from '../../../../propTypes/yacht';
import EngineTypesImgsList from './EngineTypesImgsList';
import AsText from '../../../AsText';
import ResolvedHtmlField from '../../../ResolvedHtmlField';
import MotorHorizontalSlider from './dieselDrive/MotorHorizontalSlider';
import MotorVerticalSlider from './dieselDrive/MotorVerticalSlider';
import ImagePreloader from 'image-preloader';

export default class PropulsionDieselDrive extends Component {
	componentDidMount() {
		if (Array.isArray(this.props.yacht.group_engine_technical_slides)) {
			const imgs = this.props.yacht.group_engine_technical_slides.map(({image: {url}}) => url);

			const preloader = new ImagePreloader();
			preloader.preload.apply(preloader, imgs);
		}
	}

	render() {
		let {
			propulsion_quote_title: quoteTitle,
			propulsion_quote_body: quoteBody
		} = this.props.yacht;

		return (
			<div className="propulsion__wrapper diesel-drive">
				<div className="container">
					<EngineTypesImgsList classAddons={{diesel: 'detailed__svg_dark'}}/>
					<div className="propulsion__title">
						<div className="title-block title-block_center">
							<h3 className="h3 h3_quote">
								<AsText value={quoteTitle} />
							</h3>
							<div className="title-block__sub-title title-block__sub-title_center">
								<ResolvedHtmlField content={quoteBody} />
							</div>
						</div>
					</div>
					<MotorHorizontalSlider yacht={this.props.yacht} />
					<MotorVerticalSlider yacht={this.props.yacht} />
				</div>
			</div>
		);
	}
}

PropulsionDieselDrive.propTypes = {
	yacht: yachtPagePropType().isRequired
};