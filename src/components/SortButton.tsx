import React from 'react';
type PropsType = {
    type: boolean
    header: string
    onClick:()=>void
}
export const SortButton = (props: PropsType) => {
    const onClickHandler = () => {
        props.onClick()
    }
    return <div onClick={()=> props.type && onClickHandler}>
        {props.header}
    </div>
};

