import {Button, Checkbox, Portal, TableCell, TableRow, TextField} from '@mui/material';
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {RequestType} from "../bll/request-reducer";
import {AddTime} from '../common/AddTime';
import {SelectCell} from "./SelectCell";
import Modal from "../common/Modal/Modal";
import {useAppSelector} from "../bll/store";
import s from './../common/Modal/Modal.module.css';
import {loadState} from "../common/localStorage-utils";


type SingleRequestType = {
    request: RequestType
    changeStatus: (status: boolean, id: string) => void
    deleteRequest: (id: string) => void
    changeType: (option: string, id: string) => void
    changeProgress: (option: string, id: string) => void
    changeText: (text: string, id: string) => void
    saveRequest: (isEditable: boolean, id: string) => void
    editRequest: (isEditable: boolean, id: string) => void
    setToggle: (isToggle: boolean) => void
}

export const SingleRequest = React.memo(function ({
                                                      request,
                                                      changeStatus,
                                                      deleteRequest,
                                                      changeType,
                                                      changeProgress,
                                                      changeText,
                                                      saveRequest,
                                                      editRequest,
                                                      setToggle,
                                                  }: SingleRequestType) {

    const data = require('../common/data.json')
    const name = useAppSelector<string>(state => state.request.name)
    const [show, setShow] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    //отключение кнопок EDIT, DELETE
    const [disableEdit, setDisableEdit] = useState<boolean>()
    const [disableDelete, setDisableDelete] = useState<boolean>()

    console.log('ПЕРЕРИСОВКА СНГЛ РЕКВЕСТ')

//частные события
    const onChangeStatusHandler = useMemo(() => (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(e.currentTarget.checked, request.id)
    }, [changeStatus, request])
    const onClickDelete = () => {
        setShow(true)
    }
    const yesDeleteButton = useCallback(() => {
        deleteRequest(request.id)
        setShow(false)
    }, [deleteRequest, request])
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onBlurHandler = useCallback(() => {
        changeText(text, request.id)
    }, [changeText, request, text])
    const onClickSave = useCallback(() => {
        saveRequest(true, request.id)
        setDisableEdit(false)
        setDisableDelete(false)
        setToggle(true)
    }, [saveRequest, request.id, setToggle])
    const onClickEdit = useCallback(() => {
        editRequest(false, request.id)
        setDisableDelete(false)
    }, [editRequest, request])

    //обновление тайминга для дезейбла кнопки  Edit & Delete (Edit зависимость от SAVE, Delete зависимость от SAVE & EDIT)

    useEffect(() => {
        let editButton = setTimeout(() => {
            setDisableEdit(true)
        }, 5000)

        let deleteButton = setTimeout(() => {
            setDisableDelete(true)
        }, 10000)
        return () => {
            clearTimeout(editButton)
            clearTimeout(deleteButton)
        }
    }, [request.isEditable])

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
                    {name || loadState()}
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
                            ? <>
                                <Button variant="contained" color="success" sx={{marginRight: '5px'}}
                                        disabled={disableEdit} onClick={onClickEdit}>
                                    EDIT
                                </Button>
                                <Button variant="contained" color="error" sx={{marginRight: '5px'}}
                                        disabled={disableDelete} onClick={onClickDelete}
                                >
                                    DELETE
                                </Button>
                            </>
                            : <Button variant="contained" color="success" sx={{marginRight: '5px'}}
                                      onClick={onClickSave}>
                                SAVE
                            </Button>


                    }
                </TableCell>
            </TableRow></>
    );
});

