import {useRef} from 'react';
import {listGallerySlidePropType} from '../../propTypes/yacht';
import PropTypes from 'prop-types';
import AsText from '../AsText';
import ResolvedHtmlField from '../ResolvedHtmlField';
import PhotoSwipeMarkup from './listGallery/PhotoSwipeMarkup';
import {RichText} from 'prismic-reactjs';
import _isEmpty from 'lodash/isEmpty';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';

export default function ListGallery({gallery}) {
	const $photoSwipeRoot = useRef(null);

	const photoSwipeGallery = gallery
		.filter(({image}) => image?.gallery?.url && image?.preview?.url)
		.map(({title, image}) => ({
			src: image.preview.url,
			w: image.preview.dimensions.width,
			h: image.preview.dimensions.height,
			title: _isEmpty(title) ? '' : RichText.asText(title)
		}));

	function onImgClicked(index, e) {
		e.preventDefault();

		if ($photoSwipeRoot.current) {
			const gallery = new PhotoSwipe($photoSwipeRoot.current, PhotoSwipeUI, photoSwipeGallery, {
				index: index,
				history: false
			});
			gallery.init();
		}
	}

	return (
		<div className="gallery-list">
			{gallery.map((item, i) => (
				<div key={i}
						 className="gallery-list__item flex flex_fs_s flex_sm_column"
				>
					<div className="gallery-list__descr flex flex_column">
						<div className="gallery-list__number">{`0${(i + 1)}`}</div>
						<div className="gallery-list__info flex flex_c_fs flex_column">
							<img src={item.icon?.url}
									 alt={item.icon?.alt}
									 className="gallery-list__ico"
							/>
							<h3 className="h3">
								<AsText value={item.title} />
							</h3>
							<div className="gallery-list__text">
								<ResolvedHtmlField content={item.caption} />
							</div>
						</div>
					</div>
					<div className="gallery-list__img-block">
						<a href={'#'}
							 onClick={onImgClicked.bind(this, i)}
							 className={'run-gallery'}
						>
							<img src={item.image?.gallery?.url} alt={item.image?.alt} className="gallery-list__img" />
						</a>
					</div>
				</div>
			))}
			<PhotoSwipeMarkup setRef={(val) => $photoSwipeRoot.current = val}/>
		</div>
	);
}

ListGallery.propTypes = {
	gallery: PropTypes.arrayOf(
		listGallerySlidePropType()
	).isRequired
};