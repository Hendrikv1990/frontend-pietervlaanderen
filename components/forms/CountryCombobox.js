import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../countriesList.json';
import {useTranslation} from '../Locale';
import _omit from 'lodash/omit';
import _isObject from 'lodash/isObject';

export default function CountryCombobox({inputParams, autocompleteParams, fieldName, setFieldValue, value}) {
	const {locale} = useTranslation();
	inputParams = _omit(inputParams, ['value', 'name']);

	return (
		<Autocomplete
			options={countries}
			getOptionLabel={(option) => (locale == 'en') ? option.name : option[`name_${locale}`]}
			renderInput={
				(params) => <TextField name={fieldName} {...Object.assign(params, inputParams)} />
			}
			onChange={(e, value) => {
				if (setFieldValue && fieldName) {
					setFieldValue(fieldName, value);
				}
			}}
			{...autocompleteParams}
			value={value}
			getOptionSelected={(option, value) => {
				if (_isObject(value) && value.code == option.code) {
					return true;
				}

				return false;
			}}
		/>
	);
}

CountryCombobox.propTypes = {
	inputParams: PropTypes.object,
	value: PropTypes.object,
	autocompleteParams: PropTypes.object,
	onChange: PropTypes.func,
	setFieldValue: PropTypes.func,
	fieldName: PropTypes.string
};

export const countryEmptyVal = {
	"name": "",
	"code": "",
	"name_de": "",
	"name_es": "",
	"name_fr": "",
	"name_sl": "",
	"name_it": ""
};