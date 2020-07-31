const initialState = {

};

export const actionTypes = {
	SET_ALL: 'menu/setAll'
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_ALL:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}