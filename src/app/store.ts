import { applyMiddleware, combineReducers, createStore } from 'redux';
import {tableReducer} from "../state/table-reducer";
import thunkMiddleware from "redux-thunk"


const reducers = combineReducers({
    table: tableReducer,
});


export const store = createStore(reducers,applyMiddleware(thunkMiddleware))
export type RootStateType = ReturnType<typeof reducers>;




// @ts-ignore
window.store = store;

