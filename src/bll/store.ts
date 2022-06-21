import {combineReducers, legacy_createStore as createStore} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {requestReducer} from "./request-reducer";
import {loadState, saveState} from "../common/localStorage-utils";


export const rootReducer = combineReducers({
    request: requestReducer,
})
//Типизированный useSelector
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

//Имя будем доставать из LocalStorage

export const store = createStore(rootReducer, loadState())
store.subscribe(() => {
    saveState(store.getState().request.name)
})


export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store
export type RootReducerType = any


//@ts-ignore для проверки состояния через консоль
window.store = store;