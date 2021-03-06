import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useTextLabels} from '../../../../hooks/appData';
import {useState} from 'react';
import {Formik} from 'formik';
import {postForm} from '../../../../lib/api';
import ResolvedHtmlField from '../../../ResolvedHtmlField';
import AsText from '../../../AsText';
import {fieldAttrs} from '../../../../lib/utils';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormHelperText from '@material-ui/core/FormHelperText';
import CountryCombobox from '../../../forms/CountryCombobox';
import {ThemeProvider} from '@material-ui/core/styles';

export default function MapContactDialog({office, open, handleClose}) {
	const {textLabels} = useTextLabels();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	const onSubmit = (values, helpers) => {
		postForm(Object.assign(values, {type: 'contactDealer', office: office}))
			.then(() => setSentSuccessfully(true))
			.catch(({errors}) => {
				helpers.setErrors(errors);
				helpers.setSubmitting(false);
			})
		;
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{textLabels.contact}</DialogTitle>
			{(sentSuccessfully)
				? <>
						<DialogContent>
							<h4 className={'text_center'}>{textLabels.message_was_sent}</h4>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => {setSentSuccessfully(false);handleClose();}} color="primary">
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
							setFieldValue
					}) => (
						<form onSubmit={handleSubmit}
									className={'contact-office-form'}
						>
							<DialogContent dividers>
								<div className={'office-info'}>
									<h5><AsText value={office.title} /></h5>
									<ResolvedHtmlField content={office.address} />
								</div>
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
								<CountryCombobox autocompleteParams={{fullWidth: true}}
																 inputParams={{
																	 label: `${textLabels.whats_your_country_of_residence}`,
																	 ...fieldAttrs('country', values, errors)
																 }}
																 setFieldValue={setFieldValue}
																 fieldName={'country'}
								/>
								{/*<TextField*/}
								{/*	label={`${textLabels.whats_your_country_of_residence}`}*/}
								{/*	{...fieldAttrs('country', values, errors)}*/}
								{/*	fullWidth={true}*/}
								{/*	onChange={handleChange}*/}
								{/*/>*/}
								<TextField
									label={`${textLabels.how_can_we_help_you}`}
									{...fieldAttrs('message', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									multiline={true}
								/>
								<FormGroup className={'mb-4'}>
									<FormControlLabel
										control={
											<Checkbox
												onChange={handleChange}
												name="gdpr"
												value={1}
												icon={<RadioButtonUncheckedIcon />}
												checkedIcon={<CheckCircleIcon />}
												className={'blue-checkbox'}
												required={true}
											/>
										}
										label={<ResolvedHtmlField content={textLabels.gdpr_checkbox} />}
										classes={{label: 'no-last-margin'}}
									/>
									{errors.gdpr &&
									<FormHelperText error={true}>{errors.gdpr}</FormHelperText>
									}
								</FormGroup>
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

MapContactDialog.propTypes = {
	office: PropTypes.object,
	open: PropTypes.bool,
	handleClose: PropTypes.func
};