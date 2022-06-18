export const initialState = {
    name: '',
    requestList: [],
} as InitialStateType

export const requestReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "REQUEST-REDUCER/ADD-NAME": {
            return {...state, name: action.name}
        }
        case "REQUEST-REDUCER/ADD-REQUEST": {
            return {...state, requestList: [...state.requestList, action.request]}
        }
        case "REQUEST-REDUCER/CHANGE-STATUS": {
            return {
                ...state, requestList: state.requestList.map((req) => {
                    return req.id === action.id ? {...req, status: action.status} : {...req}
                })
            }
        }
        case "REQUEST-REDUCER/DELETE-REQUEST": {
            return {
                ...state, requestList: state.requestList.filter(req => req.id !== action.id)
            }
        }
        case "REQUEST-REDUCER/CHANGE-TYPE": {
            return {
                ...state,
                requestList: state.requestList.map(req => req.id === action.id ? {
                    ...req,
                    type: action.reqType
                } : {...req})
            }
        }
        case "REQUEST-REDUCER/CHANGE-PROGRESS": {
            return {
                ...state,
                requestList: state.requestList.map(req => req.id === action.id ? {
                    ...req,
                    progress: action.progress
                } : {...req})
            }
        }
        case "REQUEST-REDUCER/ADD-TEXT": {
            return {
                ...state,
                requestList: state.requestList.map(req => req.id === action.id ? {
                    ...req,
                    requestText: action.text
                } : {...req})
            }
        }
        case "REQUEST-REDUCER/SAVE-EDIT-REQUEST": {
            return {
                ...state,
                requestList: state.requestList.map(req => req.id === action.id ? {
                    ...req,
                    isEditable: action.isEditable
                } : {...req})
            }
        }
        default:
            return {...state}
    }
}

export const saveEditRequestAC = (isEditable: boolean, id: string) => ({
    type: 'REQUEST-REDUCER/SAVE-EDIT-REQUEST',
    isEditable,
    id
} as const)
export const addTextAC = (text: string, id: string) => ({
    type: 'REQUEST-REDUCER/ADD-TEXT',
    id,
    text,
} as const)
export const deleteRequestAC = (id: string) => ({
    type: 'REQUEST-REDUCER/DELETE-REQUEST',
    id
} as const)
export const changeStatusAC = (status: boolean, id: string) => ({
    type: 'REQUEST-REDUCER/CHANGE-STATUS',
    status,
    id,
} as const)
export const addNameAC = (name: string) => ({
    type: 'REQUEST-REDUCER/ADD-NAME',
    name,
} as const)
export const addRequestAC = (request: RequestType) => ({
    type: 'REQUEST-REDUCER/ADD-REQUEST',
    request,
} as const)
export const changeTypeAC = (reqType: string, id: string) => ({
    type: 'REQUEST-REDUCER/CHANGE-TYPE',
    reqType,
    id,
} as const)
export const changeProgressAC = (progress: string, id: string) => ({
    type: 'REQUEST-REDUCER/CHANGE-PROGRESS',
    progress,
    id
} as const)
export type saveEditRequestACType = ReturnType<typeof saveEditRequestAC>
export type addTextACType = ReturnType<typeof addTextAC>
export type changeProgressACType = ReturnType<typeof changeProgressAC>
export type changeTypeACType = ReturnType<typeof changeTypeAC>
export type deleteRequestACType = ReturnType<typeof deleteRequestAC>
export type changeStatusACType = ReturnType<typeof changeStatusAC>
export type addRequestACType = ReturnType<typeof addRequestAC>
export type addNameACType = ReturnType<typeof addNameAC>
export type AppActionType =
    addNameACType
    | addRequestACType
    | changeStatusACType
    | deleteRequestACType
    | changeTypeACType
    | changeProgressACType
    | addTextACType
    | saveEditRequestACType
export type RequestType = {
    id: string
    addDate: {
        d: string
        t: string
    },
    type: string,
    progress: string,
    status: boolean,
    author: string,
    requestText: string
    isEditable: boolean
}
export type InitialStateType = {
    name: string
    requestList: RequestType[]
}

