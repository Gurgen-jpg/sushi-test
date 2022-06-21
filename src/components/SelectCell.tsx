import React, {ChangeEvent, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Portal,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Modal from "../common/Modal/Modal";
import s from './../common/Modal/Modal.module.css';
import {useAppSelector} from "../bll/store";


interface ISelectCell {
    types: string[]
    onChangeSelect: (option: string, id: string) => void
    type: string
    id: string
    label: string
    disabled: boolean
}

export const SelectCell: React.FC<ISelectCell> = ({
                                                      disabled, label, types, id, onChangeSelect, type
                                                  }) => {
    const [typeArray, setNewType] = useState<string[]>(types)
    const name = useAppSelector<string>(state => state.request.name)
    const [show, setShow] = useState<boolean>(false)
    const [newOption, setNewOption] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    // добавить новый тип или статус
    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === "...добавить") {
            setShow(true)
        }
        onChangeSelect(event.target.value as string, id);
    };
    const onChangeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewOption(e.currentTarget.value)
    }
    const saveButton = () => {
        if (newOption.trim().length > 0) {
            setNewType([newOption, ...typeArray])
            onChangeSelect(newOption, id); //todo НЕ РАБОТАЕТ --> включить первую ОПЦИЮ
            setNewOption('')

            // types.push(newOption)
            setShow(false)
        } else setError(true)
    }

    return (

        <>
            <Portal>
                <Modal show={show} setShow={setShow}>
                    <div className={s.container}>
                        <h3>{name} вы хотите добавить новую опцию?</h3>
                        <TextField
                            error={error}
                            onChange={onChangeTypeHandler}
                            value={newOption}
                        />
                        <div className={s.buttonBlock}>
                            <Button onClick={saveButton}>Добавить</Button>
                            <Button onClick={() => setShow(false)}>Отмена</Button>
                        </div>
                    </div>
                </Modal>
            </Portal>
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label={label}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        {typeArray.map((t, i) => <MenuItem key={i} value={t}>{t}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

