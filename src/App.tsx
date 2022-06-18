import React from 'react';
import {RequestList} from "./components/RequestList";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {EditableName} from "./components/EditableName";

export const PATH = {
    NAME: '/name',
    REQUEST: '/request-table',
}

export function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.NAME}/>}/>
                <Route path={PATH.NAME} element={<EditableName/>}/>
                <Route path={PATH.REQUEST} element={<RequestList/>}/>
            </Routes>
        </HashRouter>
    );
}

