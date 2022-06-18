import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {addNameAC} from "../bll/request-reducer";
import {useDispatch} from "react-redux";
import s from './../components/NameComponent.module.css';



type EditableSpanTypeProps = {
    title: string
    change: boolean
    onClick: (change: boolean) => void
}

export const EditableSpan = ({title, change, onClick}: EditableSpanTypeProps) => {
    const [name, setName] = useState<string>(title)
    const [error, setError] = useState<boolean>(false)
    const dispatch = useDispatch();
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value.trim())
        setError(false)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && name.trim().length > 0) {
            dispatch(addNameAC(name))
            onClick(true)
        } else setError(true)
    }
    const onBlurHandler = () => {
        if (name.trim().length > 0) {
            dispatch(addNameAC(name))
            onClick(true)
        } else setError(true)
    }
    const onClickHandler = () => {
        if (name.trim().length > 0) {
            dispatch(addNameAC(name))
            onClick(true)
        } else setError(true)
    }
    return (
        <>
            {
                change
                    ?
                    <div className={s.block}>
                        <div className={s.container}><TextField
                            defaultValue={name}
                            onChange={onChangeHandler}
                            // value={name}
                            onKeyPress={onKeyPressHandler}
                            onBlur={onBlurHandler}
                        />
                            <Button variant='contained' color='success' onClick={onClickHandler}>
                                Сохранить
                            </Button>
                            {error ? <span className={s.error}> введите имя пользователя</span> : ''}</div>
                    </div>
                    : <h3 onClick={() => onClick && onClick(change)}>{title}</h3>
            }
        </>
    );
};

