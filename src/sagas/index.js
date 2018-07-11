import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { noaaClimateData } from '../api/noaa';
import * as types from '../constants/actionTypes';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchClimates(action) {
    try {
        const data = yield call(noaaClimateData, action);
        yield put({ type: types.SEARCH_NOAA_SUCCESS, climates: data });
    } catch (e) {
        yield put({ type: types.SEARCH_NOAA_FAILURE, message: e.message });
    }
}

function* mySaga() {
    yield takeLatest(types.SEARCH_NOAA_REQUEST, fetchClimates);
}

export default mySaga;