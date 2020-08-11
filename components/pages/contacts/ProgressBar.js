import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function ProgressBar({steps, current, className}) {
	const stepsArr = [];
	for (let i = 1; i <= steps; i++) {
		stepsArr.push(i);
	}

	return (
		<div className={clsx('progress-bar', className)}>
			{stepsArr.map((step) => (
				<div key={step}
						 className={clsx(
							 // eslint-disable-next-line no-mixed-spaces-and-tabs
						 	'progress-bar__item',
							 {'is-complete': (step < current), 'is-current': (step === current)}
						 )}
				>
					{step}
				</div>
			))}
		</div>
	);
}

ProgressBar.propTypes = {
	steps: PropTypes.number.isRequired,
	current: PropTypes.number.isRequired,
	className : PropTypes.string
};