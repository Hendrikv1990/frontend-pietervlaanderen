import {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {Viewer} from 'photo-sphere-viewer';
import MarkersPlugin from 'photo-sphere-viewer/dist/plugins/markers.js';
import {RichText} from 'prismic-reactjs';
import clsx from 'clsx';
import ImagePreloader from 'image-preloader';
import {imagePropType} from '../propTypes/common';

export default class VirtualTour extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeImg: 0,
			viewerIsReady: false
		};
		this.$virtualTour = createRef();
		this.viewer = null;
	}

	componentDidMount() {
		const {imgs} = this.props;

		if (this.$virtualTour.current) {
			try {
				this.viewer = new Viewer({
					container: this.$virtualTour.current,
					panorama: imgs[0].virtual_tour_360_img.url,
					mousewheel: false,
					touchmoveTwoFingers: true,
					navbar: [
						'zoomOut',
						'zoomRange',
						'zoomIn',
						'fullscreen'
					],
					plugins: [
						[MarkersPlugin, {markers: []}]
					]
				});

				this.viewer.once('ready', () => {
					this.setState({viewerIsReady: true});
					this.setupImgMarkers();
				});
			} catch (e) {
				console.error('err in Viewer', e);
			}

		}

		const imgsForPreload = imgs.map(({virtual_tour_360_img: {url}}) => url);

		const preloader = new ImagePreloader();
		preloader.preload.apply(preloader, imgsForPreload);
	}

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log('componentDidUpdate:', this.$virtualTour.current)
	// }

	clearImgMarkers() {
		const markersPlugin = this.viewer.getPlugin(MarkersPlugin);
		markersPlugin.clearMarkers();
	}

	setupImgMarkers() {
		const {imgs} = this.props;
		this.clearImgMarkers();

		if (!Array.isArray(imgs[this.state.activeImg].virtual_tour_360_img_labels))
			return;

		const markersPlugin = this.viewer.getPlugin(MarkersPlugin);
		for (const {text} of imgs[this.state.activeImg].virtual_tour_360_img_labels) {
			const slitLine = String(text).split(':');
			if (slitLine.length >= 3) {
				const latitude = parseInt(slitLine[0]);
				const longitude = parseInt(slitLine[1]);
				const label = slitLine[2];

				if (latitude && longitude && label) {
					try {
						markersPlugin.addMarker({
							id: `marker-${latitude}-${longitude}`,
							latitude: `${latitude}deg`,
							longitude: `${longitude}deg`,
							tooltip: label,
							html: '<div class="yacht-marker"></div>',
							width: 22,
							height: 22
						});
					} catch (e) {
						console.error('Error adding marker:', e);
					}
				}
			}
		}
	}


	componentWillUnmount() {
		if (this.viewer && this.state.viewerIsReady) {
			try {
				this.viewer.destroy();
			} catch (e) {
				console.error('Error destroying:', e);
			}
		}
	}

	onImgTitleClicked(index, e) {
		e.preventDefault();

		if (this.viewer) {
			this.clearImgMarkers();
			this.setState({activeImg: index});
			this.viewer.setPanorama(this.props.imgs[index].virtual_tour_360_img.url)
				.then(() => {
					this.setupImgMarkers();
				});
		}
	}

	render() {
		const {imgs} = this.props;
		const {activeImg} = this.state;

		return (
			<>
				<div className={'virtual-tour-viewer'} ref={this.$virtualTour}></div>
				<ul className="virtual-tour-view-switcher">
					{imgs.map((item, i) => (
						<li key={i}
								className={clsx({active: i === activeImg})}
						>
							<a href={'#'} onClick={this.onImgTitleClicked.bind(this, i)}>
								{RichText.asText(item.virtual_tour_360_img_title)}
							</a>
						</li>
					))}
				</ul>
			</>
		);
	}
}

VirtualTour.propTypes = {
	imgs: PropTypes.arrayOf(
		PropTypes.shape({
			virtual_tour_360_img: imagePropType().isRequired,
			virtual_tour_360_img_title: PropTypes.array.isRequired,
			virtual_tour_360_img_labels: PropTypes.array
		})
	).isRequired
};