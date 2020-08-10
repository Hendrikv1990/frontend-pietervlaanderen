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
import axios from 'axios';
import {contactModelsPropType} from '../../../propTypes/contacts';
import {RichText} from 'prismic-reactjs';
import NProgress from 'nprogress';

export default function AboutYouForm({queryParams, models}) {
	const {textLabels} = useTextLabels();
	const {locale} = useTranslation();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	function onSubmit(values, helpers) {
		NProgress.start();
		axios.post(process.env.FORM_APN, Object.assign(values, queryParams, {
			type: 'interestedInNewBoat',
			model_titles: models
				.filter((model, i) => queryParams.models.includes(String(i)))
				.map(({title}) => RichText.asText(title))
		}))
			.then((data) => {
				NProgress.done();

				helpers.setSubmitting(false);
				setSentSuccessfully(true);
			})
			.catch(({response: {data}}) => {
				NProgress.done();

				helpers.setSubmitting(false);
				if (data.errors)
					helpers.setErrors(data.errors);
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
							touched,
							handleChange,
							handleBlur,
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
								<div className={'progress-bar hide_md'}>
									1 - 2 - 3 - 4
								</div>
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