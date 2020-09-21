import {useState} from 'react';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import {TextField} from '@material-ui/core';
import {fieldAttrs} from '../../../lib/utils';
import {useTextLabels} from '../../../hooks/appData';

import {ThemeProvider} from '@material-ui/core/styles';
import {basicTheme} from '../../materialUI/theme';
import NextLink from 'next/link';
import {useTranslation} from '../../Locale';
import {createGetStr} from '../../../lib/utils';
import {contactModelsPropType} from '../../../propTypes/contacts';
import {RichText} from 'prismic-reactjs';
import ProgressBar from './ProgressBar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import FormHelperText from '@material-ui/core/FormHelperText';
import {postForm} from '../../../lib/api';
import * as gtag from '../../../lib/gautils';


export default function AboutYouForm({queryuthorizationParams, models}) {
	const {textLabels} = useTextLabels();
	const {locale} = useTranslation();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	function onSubmit(values, helpers) {
		gtag.event({
			action: 'submit_form',
			category: 'interestedInNewBoat',
			label: 'Submit'
		})
		postForm(Object.assign(values, queryParams, {
			type: 'interestedInNewBoat',
			model_titles: models
				.filter((model, i) => queryParams.models.includes(Number(i)))
				.map(({title}) => RichText.asText(title))
		}))
			.then(() => setSentSuccessfully(true))
			.catch(({errors}) => {
				helpers.setErrors(errors);
				helpers.setSubmitting(false);
			});
	}

	return (
		<div className={'hint-about-location-form'}>
			{sentSuccessfully
				? <h3 className={'text_center animate__animated animate__tada'}>{textLabels.message_was_sent}</h3>
				: <Formik initialValues={{}} onSubmit={onSubmit}>
					{({
							values,
							errors,
							handleChange,
							handleSubmit,
							isSubmitting
						}) => (
						<form onSubmit={handleSubmit}>
							<div className={'centered-form'}>
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
										id={'form-how-can-we-help'}
										label={`${textLabels.your_message}`}
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
							</div>
							<nav className={'footer-nav'}>
								<NextLink href='/[lang]/contacts/yacht/location' as={`/${locale}/contacts/yacht/location?${createGetStr(queryParams)}`}>
									<a className={'back link_muted'}>
										{textLabels.back}
									</a>
								</NextLink>
								<ProgressBar steps={4} current={4} className={'hide_md'}/>
							</nav>
						</form>
					)}
				</Formik>
			}
		</div>
	);
}

AboutYouForm.propTypes = {
	queryParams: PropTypes.object,
	models: PropTypes.arrayOf(
		contactModelsPropType()
	).isRequired
};