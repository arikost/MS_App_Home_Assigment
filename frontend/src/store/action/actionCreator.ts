import { GetCategoryAction, GetPhotosAction, SetCategoryAction, SetPhotosAction } from "./actionInterface";
import { GET_CATEGORY, GET_PHOTOS, SET_CATEGORY, SET_PHOTOS } from "./actionTypes";

export const setCategory: (obj: string) => SetCategoryAction = (payload) =>({
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
