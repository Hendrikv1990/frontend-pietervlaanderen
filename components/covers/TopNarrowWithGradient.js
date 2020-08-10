import PropTypes from 'prop-types';

export default function TopNarrowCoverWithGradient({children}) {
	return (
		<div className={'top-narrow-cover'}>
			{children}
		</div>
	);
}

TopNarrowCoverWithGradient.propTypes = {
	children: PropTypes.node
}