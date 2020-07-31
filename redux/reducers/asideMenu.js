const initialState = {
	isOpened: false
};

export const actionTypes = {
	SET_IS_OPENED: 'asideMenu/setIsOpened',
	TOGGLE_OPENED: 'asideMenu/toggleOpened'
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_IS_OPENED:
			return Object.assign({}, state, {isOpened:
				action.payload
			});

		case actionTypes.TOGGLE_OPENED:
			return Object.assign({}, state, {isOpened: !state.isOpened});

		default:
			return state;
	}
}