import {imagePropType} from '../../../propTypes/common';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function CoverImg({image}) {
	let existsResolutions = ['xs', 'sm', 'md'].filter((item) => item in image);

	return (
		<>
			{existsResolutions.map((size, i) => (
				<BgImg key={i}
							 src={image[size].url}
							 className={`cover__img_${size}`}
				/>
			))}
			<BgImg src={image.url} className={'cover__img_main'} />
		</>
	);
}

CoverImg.propTypes = {
	image: imagePropType().isRequired
};

export function BgImg({src, className}) {
	return (
		<div className={clsx('cover__img', className)} style={{backgroundImage: `url(${src})`}} />
	);
}

BgImg.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string
};