import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
type Props = {
    form: UseFormReturn<any>
    label?: string
    name: string
    disabled?: boolean
}

export default function CheckboxField({
    form,
    label = '',
    name,
    disabled,
}: Props) {
    const { control } = form
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
                <FormControlLabel
                    control={<Checkbox {...field} disabled={disabled} />}
                    label={label}
                />
            )}
        />
    )
}
