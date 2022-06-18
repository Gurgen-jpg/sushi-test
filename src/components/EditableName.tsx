import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {addNameAC} from "../bll/request-reducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../App";
import s from './NameComponent.module.css';


export const EditableName = () => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setName(e.currentTarget.value.trim())
    }
    // const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter' && name.trim.length > 0) {
    //         setError(false)
    //         setName(e.currentTarget.value.trim())
    //         dispatch(addNameAC(name))
    //         navigate(PATH.REQUEST)
    //     } else {setError(true)}
    // }
    const onClickHandler = () => {
        if (name.trim().length > 0) {
            dispatch(addNameAC(name))
            navigate(PATH.REQUEST)
        } else setError(true)
    }

    return (
        <div className={s.block}>
            <div className={s.container}>
                <TextField
                    size='medium'
                    // onKeyPress={onKeyPressHandler}
                    onChange={onChangeHandler}
                    label='Имя'
                />
                <Button variant='contained' color='success'  size="large"
                        sx={{}} onClick={onClickHandler} >Сохранить</Button>
            </div>
            {error ? <span className={s.error}> введите имя пользователя</span> : ''}
        </div>
    );
};

