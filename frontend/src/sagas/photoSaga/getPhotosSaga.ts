import { call, put, select } from "redux-saga/effects";
import { RootState } from "../../store/reducers";
import { performRequest } from "./requestPefromer";
import { getPagination, setPhotos } from "../../store/action/actionCreator";

const url = 'https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q='

export function* getPhotosSaga(): Generator<any, any, any>{
    try{
        const {category} = yield select(
            ({photoReducer} : RootState) => ({
                category : photoReducer.category
            })
          );
        const response = yield call(performRequest,{
            url : url + category,
            method:'GET'
        })

        const data = response.data.hits
        const sortedData = [...data].sort((a:any, b:any) => a.id - b.id)
        yield put(setPhotos(sortedData))
    }catch(error){
        console.log('in getPhotosSaga : ', error);
    }
}