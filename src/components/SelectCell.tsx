import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";


interface ISelectCell {
    types: string[]
    onChangeSelect:(option: string, id: string) => void
    type: string
    id: string
    label: string
    disabled: boolean
}

export const SelectCell: React.FC<ISelectCell> = ({
                                                   disabled,   label,types,id,onChangeSelect, type
                                                  }) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChangeSelect(event.target.value as string, id);
    };
    return (
        <Box sx={{ minWidth: 120 }}>
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
                    {types.map((t,i)=><MenuItem key={i} value={t}>{t}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
};

