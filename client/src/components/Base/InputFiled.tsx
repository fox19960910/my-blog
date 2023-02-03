import styled from '@emotion/styled'
import { FormHelperText, TextField } from '@mui/material'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
type Props = {
    form: UseFormReturn<any>
    type?: React.HTMLInputTypeAttribute
    variant?: 'standard' | 'filled' | 'outlined'
    name: string
}

export default function InputFiled({
    form,
    type = 'text',
    variant = 'standard',
    name,
}: Props) {
    const { control, formState } = form
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <StyleInput
                        {...field}
                        type={type}
                        fullWidth
                        variant={variant}
                    />
                )}
            />
            {!!formState.errors[name] && (
                <FormHelperText
                    error={!!formState.errors[name]}
                    style={{ margin: '4px 0px 0 45px' }}
                >
                    <>{formState?.errors[name]?.message}</>
                </FormHelperText>
            )}
        </>
    )
}

const StyleInput = styled(TextField)`
    & .MuiInput-input {
        padding: 10px 5px;
    }
`
