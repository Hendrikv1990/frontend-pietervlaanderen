import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {contactModelsPropType} from '../../../propTypes/contacts';
import AsText from '../../AsText';
import ModelCheckbox from '../../materialUI/ModelCheckbox';
import {useTextLabels} from '../../../hooks/appData';
import NextLink from 'next/link';
import {useTranslation} from '../../Locale';
import {useRouter} from 'next/router';
import {createGetStr} from '../../../lib/utils';
import {useEffect, useState, useRef} from 'react';
import queryString from 'query-string';

export default function ModelsForm({models}) {
	const {textLabels} = useTextLabels();
	const {locale} = useTranslation();
	const router = useRouter();
	const formikRef = useRef();

	useEffect(() => {
		const parsedQuery = queryString.parse(window.location.search);
		if (Array.isArray(parsedQuery['models[]']) && formikRef.current) {
			formikRef.current.setFieldValue('models', parsedQuery['models[]']);
		}
	}, []);

	function onSubmit(values, helpers) {
		const as = `/${locale}/contacts/yacht/location?${createGetStr({models: values.models})}`;
		router.push('/[lang]/contacts/yacht/location', as);

		helpers.setSubmitting(false);
	}

	function onModelClicked(i, values, setFieldValue, e) {
		e.preventDefault();

		const index = values.models.indexOf(String(i));
		if (index === -1) {
			values.models.push(String(i));
		} else {
			values.models.splice(index, 1);
		}

		setFieldValue('models', values.models);
	}

	return (
		<div className={'yacht-models-form'}>
			<Formik
				initialValues={{models: []}}
				onSubmit={onSubmit}
				innerRef={formikRef}
			>
				{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setFieldValue
				}) => (
					<form onSubmit={handleSubmit}>
						<div className={'container models-container'}>
							<ul className={'models'}>
								{models.map((model, i) => (
									<li key={i}>
										<a href={'#'}
											 className={'img-wrapper'}
											 onClick={onModelClicked.bind(this, i, values, setFieldValue)}
										>
											<img src={model.image.small.url} alt={model.image.alt} />
										</a>
										<p className={'model-title'}>
											<a href={'#'}
												 onClick={onModelClicked.bind(this, i, values, setFieldValue)}
											>
												<AsText value={model.title} />
											</a>
										</p>
										<ModelCheckbox
											name={'models'}
											className={'model-checkbox'}
											onChange={handleChange}
											value={i}
											checked={values.models.includes(String(i))}
										/>
									</li>
								))}
							</ul>
						</div>
						<div className={'container'}>
							<nav className={'footer-nav'}>
								<NextLink href='/[lang]/contacts' as={`/${locale}/contacts`}>
									<a className={'back link_muted'}>
										{textLabels.back}
									</a>
								</NextLink>
								<div className={'progress-bar hide_md'}>
									1 - 2 - 3 - 4
								</div>
								<button type="submit"
												className={'next btn_link'}
												disabled={isSubmitting}
								>
									<span>{textLabels.next}</span>
									<img src={require('../../../assets/img/arrow-right.svg')} alt={'right'} />
								</button>
							</nav>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}

ModelsForm.propTypes = {
	models: PropTypes.arrayOf(
		contactModelsPropType()
	).isRequired
}