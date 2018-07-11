import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import mySaga from '../sagas'

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    )

    // then run the saga
    sagaMiddleware.run(mySaga)

    return store;
};

export default configureStore;
