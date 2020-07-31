import {combineReducers} from 'redux';
import {reducer as textLabels} from './reducers/textLabels';
import {reducer as menu} from './reducers/menu';
import {reducer as asideMenu} from './reducers/asideMenu';
import {reducer as langSwitcher} from './reducers/langSwitcher';

const rootReducer = combineReducers({
	textLabels,
	menu,
	asideMenu,
	langSwitcher
});
export default rootReducer;