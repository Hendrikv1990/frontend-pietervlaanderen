import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
	root: {
		'&:hover': {
			backgroundColor: 'rgba(32, 178, 197, 0.10)',
		},
		color: 'rgba(52, 52, 52, 0.25)'
	},
	checkedIcon: {
		color: '#20b2c5'
	}
});

export default function ModelCheckbox({className, ...props}) {
	const classes = useStyles();

	return (
		<Checkbox
			className={clsx(classes.root, className)}
			icon={<RadioButtonUncheckedIcon />}
			checkedIcon={<CheckCircleIcon className={classes.checkedIcon} />}
			color="default"
			{...props}
		/>
	);
}

ModelCheckbox.propTypes = {
	className: PropTypes.string
};