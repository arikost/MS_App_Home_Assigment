import { produce } from 'immer';
import { RootState } from '.';
import { PhotoReducerActionType } from '../action/actionInterface';
import { SET_CATEGORY, SET_PHOTOS } from '../action/actionTypes';

export type PhotosState ={
    data?: any[],
    category?: string
}
export const INITIAL_STATE_PHOTOS: PhotosState ={
    data:[],
    category:""
}

export default produce((state: PhotosState, action: PhotoReducerActionType) =>{
    switch(action.type){
        case SET_CATEGORY:
            state.category = action.payload 
            return state;
        case SET_PHOTOS:
            state.data = action.payload 
            return state;
        default:
            return state;
    }
}, INITIAL_STATE_PHOTOS)