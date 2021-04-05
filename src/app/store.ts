import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {tableReducer} from "../features/table-reducer/table-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const reducers = combineReducers({
    table: tableReducer,
});
// непосредственно создаём store
export const store = createStore(reducers,applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof reducers>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
