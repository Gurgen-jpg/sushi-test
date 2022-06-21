import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, {useCallback, useMemo, useState} from 'react';
import {EditableSpan} from "../common/EditableSpan";
import {useAppSelector} from "../bll/store";
import {SingleRequest} from "./SingleRequest";
import {
    addRequestAC, addTextAC,
    changeProgressAC,
    changeStatusAC,
    changeTypeAC,
    deleteRequestAC,
    RequestType, saveEditRequestAC
} from "../bll/request-reducer";
import {useDispatch} from "react-redux";
import {uuid} from "../common/utils";
import {columns} from "../common/columsForTable";
import {Timer} from "./Timer";


export const RequestList = () => {

    const dispatch = useDispatch();
    const name = useAppSelector<string>(state => state.request.name)
    const requestList = useAppSelector<RequestType[]>(state => state.request.requestList)
    const [changeName, setChangeName] = useState<boolean>(false)
    const [sortedData, setSortedData] = useState<'up' | 'down' | 'none'>('none')
    const [sortedType, setSortedType] = useState<boolean>(false)
    const [isToggle, setToggle] = useState<boolean>(true)

    const onClickNameHandler = useCallback((change: boolean) => {
        setChangeName(!change)
    }, [])
    const onClickAddHandler = useCallback(() => {
        let date = new Date()
        dispatch(addRequestAC({
            id: uuid(),
            addDate: {d: date.toLocaleDateString(), t: date.toLocaleTimeString().slice(0, -3)},
            type: '',
            progress: '',
            status: false,
            author: name,
            requestText: '',
            isEditable: false,
            deleteButton: true,
            editButton: true,
        }))
        setToggle(false)
    }, [name, dispatch])
    const changeStatus = useCallback((status: boolean, id: string) => {
        dispatch(changeStatusAC(status, id))
    }, [dispatch])
    const deleteRequest = useCallback((id: string) => {
        dispatch(deleteRequestAC(id))
    }, [dispatch])
    const changeType = useCallback((option: string, id: string) => {
        dispatch(changeTypeAC(option, id))
    }, [dispatch])
    const changeProgress = useCallback((option: string, id: string) => {
        dispatch(changeProgressAC(option, id))
    }, [dispatch])
    const changeText = useCallback((text: string, id: string) => {
        dispatch((addTextAC(text, id)))
    }, [dispatch])
    const saveRequest = useCallback((isEditable: boolean, id: string) => {
        dispatch(saveEditRequestAC(isEditable, id))
    }, [dispatch])
    const editRequest = useCallback((isEditable: boolean, id: string) => {
        dispatch(saveEditRequestAC(isEditable, id))
    }, [dispatch])
    const sortDate = useCallback(() => {
        switch (sortedData) {
            case "down": {
                setSortedData('up')
                break;
            }
            case 'up': {
                setSortedData('none')
                break;
            }
            case 'none': {
                setSortedData('down')
                break;
            }
        }
    }, [sortedData])


    //сортировка по времени
    let sortedRequestList: RequestType[] = useMemo(() => [...requestList], [requestList])
    if (sortedData === 'down') {
        sortedRequestList.sort((a, b) => {
            return a.addDate.t < b.addDate.t ? 1 : -1
        })
    }
    if (sortedData === "up") {
        sortedRequestList.sort((a, b) => {
            return a.addDate.t < b.addDate.t ? -1 : 1
        })
    }
    //сортировка по типу
    const sortType = useCallback(() => {
        setSortedType(!sortedType)
    }, [sortedType])
    if (sortedType) {
        sortedRequestList.sort((a, b) => {
            return a.type < b.type ? 1 : -1
        })
    }
    return (
        <>
            <Timer/>
            <EditableSpan title={name} change={changeName} onClick={onClickNameHandler}/>
            <TableContainer component={Paper}>
                <Table sx={{
                    'minWidth': '800px', '&:last-child td': {border: 0, textAlign: 'right'},
                    "&:first-child th, &:first-child td": {textAlign: 'left'}
                }}
                       aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(useMemo(() => (c, i) => {
                                    return <TableCell
                                        key={i}>
                                        {c.header}
                                    </TableCell>

                                }, []))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sortedRequestList.map((req, id) => {
                                console.log('перерисовка таблицы')
                                return <SingleRequest key={id} request={req}
                                                      changeStatus={changeStatus}
                                                      deleteRequest={deleteRequest}
                                                      changeType={changeType}
                                                      changeProgress={changeProgress}
                                                      changeText={changeText}
                                                      saveRequest={saveRequest}
                                                      editRequest={editRequest}
                                                      setToggle={setToggle}
                                />
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {isToggle && <Button variant='contained' color='success' sx={{marginTop: '20px', marginRight: '7px'}}
                                 onClick={onClickAddHandler}>Добавить
                заявку</Button>}
            <Button variant='contained' color='success' sx={{marginTop: '20px', marginRight: '7px'}} onClick={sortDate}>Сортировка
                по
                дате</Button>
            <Button variant='contained' color='success' sx={{marginTop: '20px'}} onClick={sortType}>Сортировка по
                типу</Button>
        </>
    );
};

