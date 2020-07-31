import reducers from './reducers';
import {createStore} from 'redux';

export default function makeStore(preloadedState = {}) {
	return createStore(reducers, preloadedState);
}