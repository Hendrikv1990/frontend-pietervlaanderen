import {Component, createRef} from 'react';
import {dealersPagePropType} from '../../../../propTypes/dealers';
import mapboxgl from 'mapbox-gl';
import {RichText} from 'prismic-reactjs';

export default class DealersMap extends Component {
	constructor(props) {
		super(props);

		this.$mapContainer = createRef();
		this.mapbox = null;
		this.markers = [];
	}

	componentDidMount() {
		try {
			this.setupMap();
		} catch (e) {
			console.error('Map error:', e);
		}
	}

	setupMap() {
		mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
		this.mapbox = new mapboxgl.Map({
			container: this.$mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-37.2577037854993, 23.88948087457861],
			zoom: 1.8623566060751735,
			scrollZoom: false
		});
		this.mapbox.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
		// this.mapbox.on('click', () => {
		// 	console.log(this.mapbox.getCenter(), this.mapbox.getZoom());
		// });
		// this.mapbox.addControl(
		// 	new mapboxgl.MapboxGeocoder({
		// 		accessToken: mapboxgl.accessToken,
		// 		mapboxgl: mapboxgl
		// 	})
		// );

		const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
		this.mapbox.addControl(new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			types: 'country,region,district,place'
		}), 'top-right');

		this.addMarkers();
	}

	addMarkers() {
		const bounds = new mapboxgl.LngLatBounds();
		this.props.dealersPage.dealers.forEach(({title, address, point}) => {
			try {
				const $div = document.createElement('div');
				$div.className = 'office-marker';

				const popup = new mapboxgl.Popup()
					.setHTML(`<h3>${RichText.asText(title)}</h3><div class="address">${RichText.asText(address)}</div>`)
				;

				const marker = new mapboxgl.Marker($div)
					.setLngLat([point.longitude, point.latitude])
					.setPopup(popup)
					.addTo(this.mapbox)
				;

				this.markers.push(marker);

				// bounds.extend({lon: point.longitude, lat: point.latitude});
				bounds.extend([point.longitude, point.latitude]);
			} catch (e) {
				console.error('Error adding marker:', e);
			}
		});

		if (this.markers.length) {
			this.mapbox.fitBounds(
				bounds.toArray(),
				{padding: 50}
			);
		}
	}

	componentWillUnmount() {
		if (this.mapbox) {
			this.mapbox.remove();
		}
	}

	onOfficeClicked({dealerIndex}) {
		this.closeAllPopups();

		if (!(dealerIndex in this.markers))
			return;

		const marker = this.markers[dealerIndex];
		marker.getPopup().addTo(this.mapbox);

		this.mapbox.flyTo({
			center: marker.getLngLat(),
			essential: true
		});
	}

	closeAllPopups() {
		this.markers.forEach((marker) => {
			if (marker.getPopup().isOpen()) {
				marker.getPopup().remove();
			}
		});
	}

	render() {
		return (
			<div className="map">
				<div className="map__wrapper"
						 ref={this.$mapContainer}
				></div>
			</div>
		);
	}
}

DealersMap.propTypes = {
	dealersPage: dealersPagePropType().isRequired,
};