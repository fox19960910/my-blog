import styled from '@emotion/styled'
import { FormHelperText, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'
import { Controller, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { renderError } from '../../helper/handleError'
type itemData = { label: string; value: string | number }
type Props = {
    form: UseFormReturn<any>
    name: string
    placecholder?: string
    rules?: Omit<
        RegisterOptions<any, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
    data: Array<itemData>
}

export default function SelectField({
    form,
    data,
    name,
    rules,
    placecholder,
}: Props) {
    const { control, formState } = form
    console.log('formState.errors', formState?.errors[name])

    return (
        <FormControl fullWidth>
            <InputLabel id={name}>{placecholder}</InputLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        labelId={name}
                        label={placecholder}
                        {...field}
                        error={!!formState.errors[name]}
                    >
                        {data.map((item: itemData) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {!!formState.errors[name] && (
                <FormHelperText
                    error={!!formState.errors[name]}
                    style={{ margin: '8px 0px 0 0' }}
                >
                    <>{renderError(formState.errors, name)}</>
                </FormHelperText>
            )}
        </FormControl>
    )
}
