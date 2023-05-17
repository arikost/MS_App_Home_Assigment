import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import photoReducer from './photoReducer';

const photoStorage = {
    key : 'photoStorage',
    storage : AsyncStorage,
    whitelist : []
}

const rootReducer = combineReducers({
    photoReducer : persistReducer(photoStorage, photoReducer)
})
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
