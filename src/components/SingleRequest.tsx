import {Button, Checkbox, Portal, TableCell, TableRow, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {RequestType} from "../bll/request-reducer";
import {AddTime} from '../common/AddTime';
import {SelectCell} from "./SelectCell";
import Modal from "../common/Modal/Modal";
import {useAppSelector} from "../bll/store";
import s from './../common/Modal/Modal.module.css';

type SingleRequestType = {
    request: RequestType
    changeStatus: (status: boolean, id: string) => void
    deleteRequest: (id: string) => void
    changeType: (option: string, id: string) => void
    changeProgress: (option: string, id: string) => void
    changeText: (text: string, id: string) => void
    saveRequest: (isEditable: boolean, id: string) => void
    editRequest: (isEditable: boolean, id: string) => void
    setToggle:(isToggle: boolean)=>void
}

export const SingleRequest = ({
                                  request,
                                  changeStatus,
                                  deleteRequest,
                                  changeType,
                                  changeProgress,
                                  changeText,
                                  saveRequest,
                                  editRequest,
                                  setToggle,
                              }: SingleRequestType) => {
    const data = require('./../common/request_type.json')
    const name = useAppSelector<string>(state => state.request.name)
    const [show, setShow] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(e.currentTarget.checked, request.id)
    }
    const onClickDelete = () => {
        setShow(true)
    }
    const yesDeleteButton = () => {
        deleteRequest(request.id)
        setShow(false)
    }
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        changeText(text, request.id)
    }
    const onClickSave = () => {
        saveRequest(true, request.id)
        setToggle(true)
    }
    const onClickEdit = () => {
        editRequest(false, request.id)
    }
    return (
        <>
            <Portal>
                <Modal show={show} setShow={setShow}>
                    <div className={s.container}>
                        <h3>{name} вы правда хотите удалить заявку</h3>
                        <div className={s.buttonBlock}>
                            <Button variant="contained" color="error" onClick={yesDeleteButton}>Да</Button>
                            <Button variant="contained" color="success" onClick={() => {
                                setShow(false)
                            }}>Отмена</Button>
                        </div>
                    </div>
                </Modal>
            </Portal>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell align="left">
                    <AddTime time={request.addDate}/>
                </TableCell>
                <TableCell align="right">
                    <SelectCell types={data.type}
                                type={request.type}
                                id={request.id}
                                onChangeSelect={changeType}
                                label={'Тип'}
                                disabled={request.isEditable}
                    />

                </TableCell>
                <TableCell align="right">
                    <Checkbox onChange={onChangeStatusHandler}
                              checked={request.status}
                              disabled={request.isEditable}
                    />
                </TableCell>
                <TableCell align="right">
                    <SelectCell types={data.status}
                                type={request.progress}
                                id={request.id}
                                onChangeSelect={changeProgress}
                                label={'Статус'}
                                disabled={request.isEditable}

                    />
                </TableCell>
                <TableCell align="right">
                    {request.author}
                </TableCell>
                <TableCell align="right">
                    <TextField multiline
                               rows={4}
                               defaultValue={text}
                               onBlur={onBlurHandler}
                               onChange={onChangeText}
                               label="Комментарий"
                               disabled={request.isEditable}
                    />
                </TableCell>
                <TableCell align="right">
                    {
                        request.isEditable
                        ? <Button variant="contained" color="success" sx={{marginRight: '5px'}}
                                  onClick={onClickEdit}>
                            EDIT
                        </Button>
                        : <>
                            <Button variant="contained" color="success" sx={{marginRight: '5px'}}
                                    onClick={onClickSave}>
                                SAVE
                            </Button>
                            <Button variant="contained" color="error" sx={{marginRight: '5px'}}
                                    onClick={onClickDelete}
                            >
                                DELETE
                            </Button>
                        </>
                    }
                </TableCell>
            </TableRow></>
    );
};

