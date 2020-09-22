import {useState} from 'react';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import AsText from '../../AsText';
import {TextField} from '@material-ui/core';
import {fieldAttrs} from '../../../lib/utils';
import {useTextLabels} from '../../../hooks/appData';
import {ThemeProvider} from '@material-ui/core/styles';
import {basicTheme} from '../../materialUI/theme';
import _isEmpty from 'lodash/isEmpty';
import {postForm} from '../../../lib/api';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import CountryCombobox from '../../forms/CountryCombobox';
import * as gtag from '../../../lib/gautils';

export default function MainOfficeForm({title, sendType, to}) {
	const {textLabels} = useTextLabels();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	function onSubmit(values, helpers) {
		// gtag.event({
		// 	action: 'submit_form',
		// 	category: 'generalForm',
		// 	label: 'Submit'
		// })
		postForm(Object.assign(values, {type: sendType, to: to}))
			.then(() => setSentSuccessfully(true))
			.catch(({errors}) => {
				helpers.setErrors(errors);
				helpers.setSubmitting(false);
			})
		;
	}

	return (
		<div className={'main-office-form'}>
			{!_isEmpty(title) &&
			<h3 className={'head'}><AsText value={title} /></h3>
			}
			{(sentSuccessfully)
				? <h3 className={'text_center animate__animated animate__tada'}>{textLabels.message_was_sent}</h3>
				: <Formik initialValues={{}} onSubmit={onSubmit}>
					{({
							values,
							errors,
							handleChange,
							handleSubmit,
							isSubmitting,
							setFieldValue
						}) => (
						<form className={'centered-form'}
									onSubmit={handleSubmit}
						>
							<ThemeProvider theme={basicTheme}>
								<TextField
									id={'form-what-is-your-name'}
									label={`${textLabels.what_is_your_name}`}
									{...fieldAttrs('name', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									required={true}
								/>
								<TextField
									id={'form-what-is-your-email'}
									label={`${textLabels.what_is_your_email_address}`}
									{...fieldAttrs('email', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									required={true}
									type={'email'}
								/>
								<TextField
									id={'form-what-is-your-phone'}
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
								{/*	id={'form-what-is-your-country'}*/}
								{/*	label={`${textLabels.whats_your_country_of_residence}`}*/}
								{/*	{...fieldAttrs('country', values, errors)}*/}
								{/*	fullWidth={true}*/}
								{/*	onChange={handleChange}*/}
								{/*/>*/}
								<TextField
									id={'form-how-can-we-help'}
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
								<div className={'btns-row'}>
									<button type={'submit'}
													className={'btn btn_border_stretched_30'}
													disabled={isSubmitting}
									>
										{textLabels.submit}
									</button>
								</div>
							</ThemeProvider>
						</form>
					)}
				</Formik>
			}
		</div>
	);
}

MainOfficeForm.defaultProps = {
	sendType: 'mainOffice',
	showSubmitBtn: true
};

MainOfficeForm.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	sendType: PropTypes.string,
	to: PropTypes.object
};