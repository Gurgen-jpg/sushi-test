import React, {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../App';
import {useDispatch} from "react-redux";
import {resetTableAC} from "../bll/request-reducer";

export const Timer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [active, setActive] = useState<boolean>(false)
    const [[minute, seconds], setTimer] = useState<number[]>([10, 0]) // на бездействие

//отсчет времени бездействия
    const tickTime =  () => {
        if (seconds === 0) {
            setTimer((prevState)=>[prevState[0] - 1, 59])
        } else setTimer((prevState)=>[prevState[0], prevState[1] - 1])
    }

    useEffect(() => {
        if (minute === 0 && seconds === 0 && !active) {
            setActive(true)
        }
    })

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        const interval = 1000;
        const callback = () => {
            tickTime();
            timerId = setTimeout(callback, interval)
        }
        timerId = setTimeout(callback, interval)

        return () => clearTimeout(timerId);
    },[])
//сброс таймера бездействия
    const resetTimer = useMemo(()=>() => {
        setTimer([10, 0])
    },[])
    useEffect(() => {
        window.addEventListener("mousemove", resetTimer)
        window.addEventListener('scroll', resetTimer)
        window.addEventListener('mousedown', resetTimer)
        return () => {
            window.removeEventListener("mousemove", resetTimer)
            window.removeEventListener('scroll', resetTimer)
            window.removeEventListener('mousedown', resetTimer)
        }
    }, [resetTimer])

    if (active) {
        navigate(PATH.NAME)
        dispatch(resetTableAC())
    }
    return (
        <>

        </>
    );
};
