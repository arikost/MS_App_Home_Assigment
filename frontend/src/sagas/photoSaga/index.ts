import {takeLatest} from 'redux-saga/effects';
import { GET_PHOTOS } from '../../store/action/actionTypes';
import { getPhotosSaga } from './getPhotosSaga';


export function* watcherSaga(){
    yield takeLatest(GET_PHOTOS, getPhotosSaga);
}