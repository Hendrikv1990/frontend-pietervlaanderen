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
import {useEffect, useRef} from 'react';
import ProgressBar from './ProgressBar';
import CountryCombobox, {countryEmptyVal} from '../../forms/CountryCombobox';
import _defaults from 'lodash/defaults';

export default function HintAboutLocationForm({queryParams, onSubmit}) {
	const {textLabels} = useTextLabels();
	const {locale} = useTranslation();
	const formikRef = useRef();

	_defaults(queryParams, {
		country: countryEmptyVal,
		navigation: countryEmptyVal,
	});

	useEffect(() => {
		if (formikRef.current) {
			formikRef.current.setValues(queryParams);
		}
	}, [queryParams]);

	return (
		<div className={'hint-about-location-form'}>
			<Formik initialValues={queryParams}
							onSubmit={onSubmit}
							innerRef={formikRef}
			>
				{({
						values,
						errors,
						handleChange,
						handleSubmit,
						isSubmitting,
						setFieldValue
					}) => (
					<form onSubmit={handleSubmit}>
						<div className={'centered-form'}>
							<ThemeProvider theme={basicTheme}>
								{/*<TextField*/}
								{/*	id={'form-what-is-your-country'}*/}
								{/*	label={`${textLabels.whats_your_country_of_residence}`}*/}
								{/*	{...fieldAttrs('country', values, errors)}*/}
								{/*	fullWidth={true}*/}
								{/*	onChange={handleChange}*/}
								{/*/>*/}
								<CountryCombobox autocompleteParams={{fullWidth: true}}
																 inputParams={{
																	 label: `${textLabels.whats_your_country_of_residence}`,
																	 ...fieldAttrs('country', values, errors)
																 }}
																 setFieldValue={setFieldValue}
																 fieldName={'country'}
																 value={values.country}
								/>
								<CountryCombobox autocompleteParams={{fullWidth: true}}
																 inputParams={{
																	 label: `${textLabels.what_is_your_navigation_area}`,
																	 ...fieldAttrs('navigation', values, errors)
																 }}
																 setFieldValue={setFieldValue}
																 fieldName={'navigation'}
																 value={values.navigation}
								/>
								{/*<TextField*/}
								{/*	id={'form-what-is-your-navigation'}*/}
								{/*	label={`${textLabels.what_is_your_navigation_area}`}*/}
								{/*	{...fieldAttrs('navigation', values, errors)}*/}
								{/*	fullWidth={true}*/}
								{/*	onChange={handleChange}*/}
								{/*/>*/}
							</ThemeProvider>
						</div>
						<nav className={'footer-nav'}>
							<NextLink href='/[lang]/contacts/yacht'
												as={`/${locale}/contacts/yacht?${createGetStr({models: queryParams.models})}`}
							>
								<a className={'back link_muted'}>
									{textLabels.back}
								</a>
							</NextLink>
							<ProgressBar steps={4} current={3} className={'hide_md'} />
							<button type="submit"
											className={'next btn_link'}
											disabled={isSubmitting}
							>
								<span>{textLabels.next}</span>
								<img src={require('../../../assets/img/arrow-right.svg')} alt={'right'} />
							</button>
						</nav>
					</form>
				)}
			</Formik>
		</div>
	);
}

HintAboutLocationForm.propTypes = {
	queryParams: PropTypes.object,
	onSubmit: PropTypes.func
};