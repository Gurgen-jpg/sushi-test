import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, {useEffect, useState} from 'react';
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
import {uuid} from "../common/uuidUtil";
import { useNavigate } from 'react-router-dom';
import {PATH} from "../App";


export const RequestList = () => {
    const columns = [
        {
            header: 'Дата добавления',
            accessor: 'addDate',
            sorted: true,
        },
        {
            header: 'Тип заявки',
            accessor: 'type',
            sorted: true,
        },
        {
            header: 'Готовность',
            accessor: 'status',
            sorted: false,
        },
        {
            header: 'Статус',
            accessor: 'progress',
            sorted: false,
        },
        {
            header: 'Автор',
            accessor: 'author',
            sorted: false,
        },
        {
            header: 'Текст',
            accessor: 'requestText',
            sorted: false,
        },
    ]
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useAppSelector<string>(state => state.request.name)
    const requestList = useAppSelector<RequestType[]>(state => state.request.requestList)
    const [changeName, setChangeName] = useState<boolean>(false)
    const [sortedData, setSortedData] = useState<'up' | 'down' | 'none'>('none')
    const [sortedType, setSortedType] = useState<boolean>(false)

    //таймер
    const [active, setActive] = useState<boolean>(false)
    const [[minute,seconds],setTimer] =useState<number[]>([0,20])

    const tickTime = () => {
      if (minute === 0 && seconds === 0) {
          setActive(true)
      } else if (seconds === 0) {
          setTimer([minute -1, 59])
      } else setTimer([minute, seconds - 1])
    }
    useEffect(()=>{
        const timerID = setInterval(() => tickTime(), 1000);
        return () => clearInterval(timerID);
    })
    useEffect(()=>{
        
    })


    const resetTimer = () => {
      setTimer([10, 0])
    }

    const onClickNameHandler = (change: boolean) => {
        setChangeName(!change)
    }
    const onClickAddHandler = () => {
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
        }))
    }
    const changeStatus = (status: boolean, id: string) => {
        dispatch(changeStatusAC(status, id))
    }
    const deleteRequest = (id: string) => {
        dispatch(deleteRequestAC(id))
    }
    const changeType = (option: string, id: string) => {
        dispatch(changeTypeAC(option, id))
    }
    const changeProgress = (option: string, id: string) => {
        dispatch(changeProgressAC(option, id))
    }
    const changeText = (text: string, id: string) => {
        dispatch((addTextAC(text, id)))
    }
    const saveRequest = (isEditable: boolean, id: string) => {
        dispatch(saveEditRequestAC(isEditable,id))
    }
    const editRequest = (isEditable: boolean, id: string) => {
      dispatch(saveEditRequestAC(isEditable, id))
    }
    const sortDate = () => {
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
    }


    //сортировка по времени
    let sortedRequestList: RequestType[] = [...requestList]
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
    const sortType = () => {
        setSortedType(!sortedType)
    }
    if (sortedType) {
        sortedRequestList.sort((a, b) => {
            return a.type < b.type ? 1 : -1
        })
    }
    if (active) {
        navigate(PATH.NAME)
    }
    return (

        <>
            <p>{`${minute} : ${seconds}`}</p>
            <EditableSpan title={name} change={changeName} onClick={onClickNameHandler}/>
            <TableContainer component={Paper}>

                <Table sx={{'minWidth': '700px', '&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}
                       aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((c, i) => {
                                    return <TableCell
                                        key={i}>
                                        {c.header}
                                    </TableCell>

                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRequestList.map((req, id) => {
                            console.log('перерисовка таблицы')
                            return <SingleRequest key={id} request={req}
                                                  changeStatus={changeStatus}
                                                  deleteRequest={deleteRequest}
                                                  changeType={changeType}
                                                  changeProgress={changeProgress}
                                                  changeText={changeText}
                                                  saveRequest={saveRequest}
                                                  editRequest={editRequest}

                            />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='contained' color='success' sx={{marginTop: '20px'}} onClick={onClickAddHandler}>Добавить
                заявку</Button>
            <Button variant='contained' color='success' sx={{marginTop: '20px'}} onClick={sortDate}>Сортировка по
                дате</Button>
            <Button variant='contained' color='success' sx={{marginTop: '20px'}} onClick={sortType}>Сортировка по
                типу</Button>

        </>
    );
};

