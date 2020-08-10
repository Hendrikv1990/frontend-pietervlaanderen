import {useState} from 'react';
import {Formik} from 'formik';
import {ThemeProvider} from '@material-ui/core/styles';
import {basicTheme} from '../../materialUI/theme';
import {TextField} from '@material-ui/core';
import {fieldAttrs} from '../../../lib/utils';
import {useTextLabels} from '../../../hooks/appData';
import Checkbox from '@material-ui/core/Checkbox';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


export default function SubscriptionForm() {
	const {textLabels} = useTextLabels();
	const [sentSuccessfully, setSentSuccessfully] = useState(false);

	function onSubmit() {

	}

	return (
		<div className={'subscription-form'}>
			<div className={'container'}>
				{(sentSuccessfully)
					? <h3 className={'text_center animate__animated animate__tada'}>{textLabels.message_was_sent}</h3>
					: <div className={'form-wrapper'}>
							<Formik initialValues={{}} onSubmit={onSubmit}>
							{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting,
								}) => (
								<form className={'centered-form'}
											onSubmit={handleSubmit}
								>
									<ThemeProvider theme={basicTheme}>
										<h2 className={'subscribe-header text_center'}>
											{textLabels.stay_up_to_date}
										</h2>
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
										<div className={'agree-with-terms'}>
											<Checkbox
												id={'subscribe-agreed'}
												name={'agreed'}
												required={true}
												onChange={handleChange}
												value={1}
												icon={<RadioButtonUncheckedIcon />}
												checkedIcon={<CheckCircleIcon />}
											/>
											<label htmlFor={'subscribe-agreed'}>
												<ResolvedHtmlField content={textLabels.i_agree_with} />
											</label>
										</div>
										<div className={'btns-row'}>
											<button type={'submit'}
															className={'btn btn_border_stretched_30'}
															disabled={isSubmitting}
											>
												{textLabels.subscribe}
											</button>
										</div>
									</ThemeProvider>
								</form>
							)}
						</Formik>
					</div>
				}
			</div>
		</div>
	);
}