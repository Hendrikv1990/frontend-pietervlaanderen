import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {actionTypes as textLabelsActionTypes} from '../redux/reducers/textLabels';
import {actionTypes as menuActionTypes} from '../redux/reducers/menu';

export function useAppData() {
	const dispatch = useDispatch();

	function setAppData(textLabels, menus) {
		dispatch({
			type: textLabelsActionTypes.SET,
			payload: textLabels
		});

		dispatch({
			type: menuActionTypes.SET_ALL,
			payload: menus
		});
	}

	return {
		setAppData
	};
}

export function useTextLabels() {
	const textLabels = useSelector((state) => state.textLabels, shallowEqual);

	return {
		textLabels
	};
}

export function useMenu(key) {
	const menu = useSelector((state) =>
		(key in state.menu) ? state.menu[key] : null
	, shallowEqual);

	return {
		menu
	};
}