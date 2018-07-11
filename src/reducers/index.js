import { combineReducers } from 'redux';
import climate from './climateReducer';

const rootReducer = combineReducers({
    climate
});

export default rootReducer;