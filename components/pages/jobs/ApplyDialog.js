import PropTypes from 'prop-types';
import {jobPositionPropType} from '../../../propTypes/jobs';
import {useTextLabels} from '../../../hooks/appData';
import {useState} from 'react';
import {postForm} from '../../../lib/api';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {Formik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {fieldAttrs} from '../../../lib/utils';

export default function ApplyDialog({position, open, handleClose}) {
	const {textLabels} = useTextLabels();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	const onSubmit = (values, helpers) => {
		postForm(Object.assign(values, {type: 'applyForPosition', position: position}))
			.then(() => setSentSuccessfully(true))
			.catch(({errors}) => {
				helpers.setErrors(errors);
				helpers.setSubmitting(false);
			})
		;
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{textLabels.apply}</DialogTitle>
			{(sentSuccessfully)
				? <>
					<DialogContent>
						<h4 className={'text_center'}>{textLabels.message_was_sent}</h4>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => {handleClose();setSentSuccessfully(false);}} color="primary">
							{textLabels.close}
						</Button>
					</DialogActions>
				</>
				: <Formik initialValues={{}} onSubmit={onSubmit}>
					{({
							values,
							errors,
							handleChange,
							handleSubmit,
							isSubmitting,
						}) => (
						<form onSubmit={handleSubmit}
									className={'contact-office-form'}
						>
							<DialogContent dividers>
								<TextField
									label={`${textLabels.what_is_your_name}`}
									{...fieldAttrs('name', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									required={true}
								/>
								<TextField
									label={`${textLabels.what_is_your_email_address}`}
									{...fieldAttrs('email', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									required={true}
									type={'email'}
								/>
								<TextField
									label={`${textLabels.what_is_your_phone_number}`}
									{...fieldAttrs('phone', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									required={true}
								/>
								<TextField
									label={`${textLabels.cv}`}
									{...fieldAttrs('cv', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									multiline={true}
									required={true}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="primary">
									{textLabels.cancel}
								</Button>
								<Button color="primary" type={'submit'} disabled={isSubmitting}>
									{textLabels.submit}
								</Button>
							</DialogActions>
						</form>
					)}
					</Formik>
				}
		</Dialog>
	);
}

ApplyDialog.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	position: jobPositionPropType()
};