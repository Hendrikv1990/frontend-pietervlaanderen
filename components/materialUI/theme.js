import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

let basicTheme = createMuiTheme({
	typography: {
		fontFamily: [
			'ProximaNovaA', 'sans-serif'
		],
		fontSize: 15.8
	},
	overrides: {
		MuiFormLabel: {
			root: {
				color: '#343434'
			}
		}
	}
});
basicTheme = responsiveFontSizes(basicTheme);

export {basicTheme};
