import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.climates, action) {
    switch (action.type) {
        case types.SEARCH_NOAA_SUCCESS:
            console.log(action)
            return { ...state, climates: action.climates };
        default:
            return state;
    }
}