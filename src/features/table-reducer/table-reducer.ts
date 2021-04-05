import {Dispatch} from "redux";
import {walkingApi} from "../../api/api";


const initialState = {
    arrayWalkings: [] as Array<DataType>,
    editWalking:{} as DataType
};

export const SET_NEW_ARR = 'SET_NEW_ARR';
export const DELETE_WALKING = 'DELETE_WALKING';
export const SORT_DATE = 'SORT_DATE';
export const SORT_DISTANCE = 'SORT_DISTANCE';
export const GET_WALKING = 'GET_WALKING';




export function tableReducer(state: InitialStateType = initialState, action: ActionTypes): InitialStateType {
    switch (action.type) {
        case SET_NEW_ARR:
            return {...state, arrayWalkings: action.array};
        case DELETE_WALKING:
            return {...state, arrayWalkings: [...state.arrayWalkings.filter(wlk => wlk.id !== action.id)]}
        case SORT_DATE:
            return {...state,arrayWalkings:[...state.arrayWalkings.sort((a, b) => {
                return a.date === b.date ? 0 :
                    a.date > b.date ? 1 : -1
            })]}
        case SORT_DISTANCE:
            return {...state,arrayWalkings:[...state.arrayWalkings.sort((a, b) => {
                    return b.distance - a.distance
                })]}
        case GET_WALKING:
            return {
                ...state,
                editWalking:action.obj
            }
        default:
            return state;
    }
}


export const setNewArrAC = (array: Array<DataType>) => ({type: SET_NEW_ARR,array}as const);
export const deleteWalkikngAC = (id: number) => ({type: DELETE_WALKING, id}as const)
export const sortWalkingsByDate = () => ({type: SORT_DATE}as const)
export const sortWalkingsByDistance = () => ({type: SORT_DISTANCE}as const)
export const getWalkingByIdAC = (obj:DataType) => ({type: GET_WALKING, obj}as const)


export const getListOfWalkings = () => async (dispatch: Dispatch) => {
        await walkingApi.getListOfWalkings()
            .then(response=> dispatch(setNewArrAC(response.data)))
            .catch(err=>alert(err))
}

export const removeWalking = (id: number) => async (dispatch: Dispatch) => {
        await walkingApi.deleteWalkingById(id)
            .then(res=>{
                dispatch(deleteWalkikngAC(id))
                window.location.hash = "#/table"
            })
            .catch(err=>alert(err))
}

export const addWalking = (date: string, distance: any) => async (dispatch: Dispatch) => {
            await walkingApi.addNewWalking(date, distance)
                .then(res=>{
                    window.location.hash = "#/table"
                })
                .catch(err=>alert(err))
}

export const getWalking = (id: number) => async (dispatch: Dispatch) => {
            await walkingApi.getWalkingById(id)
                .then(res=>{
                    dispatch(getWalkingByIdAC(res.data))
                    window.location.hash = "#/editWalking"
                })
                .catch(err=>alert(err))
}

export const updateWalking = (id: number,date:string,distance:any) => async (dispatch: Dispatch) => {
            await walkingApi.updateWalkingById(id,date,distance)
                .then(res=>{
                    window.location.hash = "#/table"
                })
                .catch(err=>alert(err))
}

export type InitialStateType = {
    arrayWalkings: Array<DataType>
    editWalking:DataType

};
export type DataType = {
    id: number,
    date: string
    distance:number
}
type ActionTypes = ReturnType<typeof setNewArrAC>
    | ReturnType<typeof deleteWalkikngAC>
    | ReturnType<typeof sortWalkingsByDate>
    | ReturnType<typeof sortWalkingsByDistance>
    | ReturnType<typeof getWalkingByIdAC>


