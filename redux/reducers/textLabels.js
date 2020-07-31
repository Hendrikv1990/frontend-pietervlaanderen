const initialState = {
};

export const actionTypes = {
	SET: 'textLabels/set'
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}