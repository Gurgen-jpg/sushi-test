export const initialState = {
    isInitialized: false,


} as InitialStateType

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "APP-REDUCER/INITIALIZE": {
            return {...state, isInitialized: action.access}
        }
        default:
            return {...state}
    }
}
export const initializedAppAC = (access: boolean) => ({
    type: 'APP-REDUCER/INITIALIZE',
    access
} as const)


export type initializedAppACType = ReturnType<typeof initializedAppAC>
export type AppActionType =
    initializedAppACType
export type InitialStateType = {
    isInitialized: boolean
}
