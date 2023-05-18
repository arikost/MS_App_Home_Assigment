import { Categories, GetCategoryAction, GetPaginationAction, GetPhotosAction, PaginationState, SetCategoryAction, SetPhotosAction } from "./actionInterface";
import { GET_CATEGORY, GET_PAGINATION, GET_PHOTOS, SET_CATEGORY, SET_PHOTOS } from "./actionTypes";

export const setCategory: (obj: Categories) => SetCategoryAction = (payload) =>({
    type : SET_CATEGORY,
    payload
})
export const getCategory: () => GetCategoryAction = () => ({
    type: GET_CATEGORY
})
export const getPhotos: () => GetPhotosAction = () => ({
    type : GET_PHOTOS
})
export const setPhotos: (obj: any[]) => SetPhotosAction = (payload) => ({
    type : SET_PHOTOS,
    payload
})
export const getPagination: (obj : PaginationState) => GetPaginationAction = (payload) => ({
    type: GET_PAGINATION,
    payload
})
