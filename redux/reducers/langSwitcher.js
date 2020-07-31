const initialState = {
	isOpened: false
};

export const actionTypes = {
	SET_IS_OPENED: 'langSwitcher/setIsOpened',
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_IS_OPENED:
			return Object.assign({}, state, {isOpened:
				action.payload
			});

		default:
			return state;
	}
}