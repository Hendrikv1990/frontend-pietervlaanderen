import AsText from '../AsText';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function TopNarrowSection({title, subTitle, className}) {
	return (
		<section className={clsx('top-narrow', className)}>
			<div className="container">
				<h1 className="top-narrow__title">
					<AsText value={title} />
				</h1>
				<div className="top-narrow__subtitle top-narrow__subtitle_roundhand">
					<AsText value={subTitle} />
				</div>
			</div>
		</section>
	);
}

TopNarrowSection.propTypes = {
	title: PropTypes.array,
	subTitle: PropTypes.array,
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string
	])
};