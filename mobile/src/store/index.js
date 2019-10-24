import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persisReducers from './peristReducers';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMidlleware = createSagaMiddleware({sagaMonitor});

const middlewares = [sagaMidlleware];

const store = createStore(persisReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMidlleware.run(rootSaga);

export {store, persistor};
