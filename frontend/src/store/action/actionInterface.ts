import { GET_CATEGORY, GET_PHOTOS, SET_CATEGORY, SET_PHOTOS } from "./actionTypes";

export interface SetCategoryAction {
    type : typeof SET_CATEGORY;
    payload : string
}
export interface GetCategoryAction {
    type : typeof GET_CATEGORY;
}
export interface GetPhotosAction {
    type : typeof GET_PHOTOS;
}
export interface SetPhotosAction {
    type : typeof SET_PHOTOS;
    payload : any[]
}
export type PhotoReducerActionType =
    | SetCategoryAction
    | SetPhotosAction