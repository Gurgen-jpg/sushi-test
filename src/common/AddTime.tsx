import React from 'react';
import s from './common.module.css';
type UpdateFormatPropsType = {
    time: {
        d:string,
        t:string
    }
}

export const AddTime = ({time}:UpdateFormatPropsType) => {
    return (
        <div>
            <div>
                <span className={s.d}>{time.d}</span> <span className={s.t}>{time.t}</span>
            </div>
        </div>
    );
};
