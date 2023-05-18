import { produce } from 'immer';
import { RootState } from '.';
import { Categories, PhotoReducerActionType } from '../action/actionInterface';
import { GET_PAGINATION, SET_CATEGORY, SET_PHOTOS } from '../action/actionTypes';
import { ElementProps } from '../../../App';

export type PhotosState ={
    allData?: ElementProps[],
    category?: Categories,
    currentDate? : ElementProps[],
    index : number
}
export const INITIAL_STATE_PHOTOS: PhotosState ={
    allData:[],
    category:"",
    currentDate:[],
    index:0
}

export default produce((state: PhotosState, action: PhotoReducerActionType) =>{
    switch(action.type){
        case SET_CATEGORY:
            state.category = action.payload 
            return state;
        case SET_PHOTOS:
            state.allData = action.payload ;
            state.currentDate = [...state.allData.slice(state.index,9)];
            state.index = 0;
            return state;
        case GET_PAGINATION:
            if(state.allData){
                if(action.payload === 'backward' && state.index > 0 ){
                    state.index -=9
                }else if(action.payload === 'forward' && state.index + 9 < state.allData.length){
                    state.index +=9
                }
                state.currentDate = [...state.allData.slice(state.index, state.index + 9)]
            }
        default:
            return state;
    }
}, INITIAL_STATE_PHOTOS)