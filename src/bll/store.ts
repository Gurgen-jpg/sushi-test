import {combineReducers, legacy_createStore as createStore} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {requestReducer} from "./request-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    request: requestReducer,
})
export const store = createStore(rootReducer)
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
store.subscribe(() => {
    localStorage.setItem('name', JSON.stringify(store.getState().request.name))
})


export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store
export type RootReducerType = any


//@ts-ignore для проверки состояния через консоль
window.store = store;