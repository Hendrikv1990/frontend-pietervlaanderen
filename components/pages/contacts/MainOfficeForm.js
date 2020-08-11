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

export default function MainOfficeForm({title, sendType, to}) {
	const {textLabels} = useTextLabels();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	function onSubmit(values, helpers) {
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
								<TextField
									id={'form-what-is-your-country'}
									label={`${textLabels.whats_your_country_of_residence}`}
									{...fieldAttrs('country', values, errors)}
									fullWidth={true}
									onChange={handleChange}
								/>
								<TextField
									id={'form-how-can-we-help'}
									label={`${textLabels.how_can_we_help_you}`}
									{...fieldAttrs('message', values, errors)}
									fullWidth={true}
									onChange={handleChange}
									multiline={true}
								/>
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