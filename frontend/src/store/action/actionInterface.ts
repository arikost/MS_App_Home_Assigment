import { GET_CATEGORY, GET_PAGINATION, GET_PHOTOS, SET_CATEGORY, SET_PHOTOS } from "./actionTypes";

export interface SetCategoryAction {
    type : typeof SET_CATEGORY;
    payload : Categories
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
export interface GetPaginationAction {
    type : typeof GET_PAGINATION;
    payload : PaginationState
}
export type PaginationState = 'backward' | 'forward'
export type Categories = 'sport' | 'animal' | 'work' | ''
export type PhotoReducerActionType =
    | SetCategoryAction
    | SetPhotosAction
    | GetPaginationAction