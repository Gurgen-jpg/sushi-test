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
import {uuid} from "../common/utils";
import {useNavigate} from 'react-router-dom';
import {PATH} from "../App";
import {columns} from "../common/columsForTable";


export const RequestList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useAppSelector<string>(state => state.request.name)
    const requestList = useAppSelector<RequestType[]>(state => state.request.requestList)
    const [changeName, setChangeName] = useState<boolean>(false)
    const [sortedData, setSortedData] = useState<'up' | 'down' | 'none'>('none')
    const [sortedType, setSortedType] = useState<boolean>(false)
    const [isToggle, setToggle] = useState<boolean>(true)

//таймер
    const [active, setActive] = useState<boolean>(false)
    const [[minute, seconds], setTimer] = useState<number[]>([0, 5]) // на бездействие

//отсчет времени бездействия
    const tickTime = () => {
        if (minute === 0 && seconds === 0) {
            setActive(true)
        } else if (seconds === 0) {
            setTimer([minute - 1, 59])
        } else setTimer([minute, seconds - 1])
    }

    useEffect(() => {
        console.log('useefect 1')
        const timerID = setInterval(() => tickTime(), 1000);
        return () => clearInterval(timerID);
    }, [tickTime])
//сброс таймера бездействия
    const resetTimer = () => {
        setTimer([0, 5])
    }
    useEffect(() => {
        console.log('useefect resetTimer')
        window.addEventListener("mousemove", resetTimer)
        window.addEventListener('scroll', resetTimer)
        window.addEventListener('mousedown', resetTimer)
        return () => {
            window.removeEventListener("mousemove", resetTimer)
            window.removeEventListener('scroll', resetTimer)
            window.removeEventListener('mousedown', resetTimer)
        }
    }, [])
//общие события
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
            deleteButton: true,
            editButton: true,
        }))
        setToggle(false)
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
        dispatch(saveEditRequestAC(isEditable, id))
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

    //Если пользователя нет больше 10 минут переход на страницу имени
    if (active) {
        navigate(PATH.NAME)
    }
    return (
        <>
            <p>{`${minute} : ${seconds}`}</p>
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
                                                  setToggle={setToggle}
                            />
                        })}
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

