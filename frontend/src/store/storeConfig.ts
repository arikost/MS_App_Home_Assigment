import {applyMiddleware, createStore, Store} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga';
import reducers from './reducers';
import { watcherSaga } from '../sagas/photoSaga';

export let sagaMiddleware: SagaMiddleware;

sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);

export const persisStore = persistStore(store);

export default store;
