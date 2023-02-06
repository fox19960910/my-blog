import styled from '@emotion/styled'
import { FormHelperText, TextField } from '@mui/material'
import React from 'react'
import { Controller, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { renderError } from '../../helper/handleError'
type Props = {
    form: UseFormReturn<any>
    type?: React.HTMLInputTypeAttribute
    variant?: 'standard' | 'filled' | 'outlined'
    name: string
    placecholder?: string
    rules?: Omit<
        RegisterOptions<any, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
}

export default function InputFiled({
    form,
    type = 'text',
    variant = 'standard',
    name,
    rules,
    placecholder,
}: Props) {
    const { control, formState } = form
    console.log('formState.errors', formState?.errors[name])

    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <StyleInput
                        {...field}
                        type={type}
                        fullWidth
                        variant={variant}
                        error={!!formState.errors[name]}
                        label={placecholder}
                    />
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
        </>
    )
}

const StyleInput = styled(TextField)`
    & .MuiInput-input {
        padding: 10px 5px;
    }
`
