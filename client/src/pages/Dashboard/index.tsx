import React, { useState, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Template from '../../components/layouts/Template'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/system'
import InputFiled from '../../components/Base/InputFiled'
import SelectField from '../../components/Base/SelectField'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { shades } from '../../styles/theme'
import { PostContext } from '../../contexts/PostContext'
const CATEGORY_DATA = [
    {
        label: 'Accessory',
        value: 'accessory',
    },
    {
        label: 'Travel',
        value: 'travel',
    },
    {
        label: 'Food',
        value: 'food',
    },
]
type Props = {}

type TPostForm = {
    title: string
    description: string
    category: 'accessory' | 'travel' | 'food'
    image: string
}
function DashBoard({}: Props) {
    const context = useContext(PostContext)
    const [content, setContent] = useState('')
    const form = useForm<TPostForm>({
        defaultValues: {
            title: '',
            description: '',
            image: '',
            category: 'accessory',
        },
    })
    const { handleSubmit } = form
    const handleChange = (value: any) => {
        setContent(value)
    }

    const postData = async (data: TPostForm) => {
        const payload = {
            ...data,
            body: content,
        }
        try {
            const data = await context?.createPost(payload)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    console.log(form.formState.errors)

    return (
        <Template>
            <form onSubmit={handleSubmit(postData)}>
                <Box mb={2}>
                    <InputFiled
                        name="title"
                        form={form}
                        rules={{ required: true }}
                        variant="outlined"
                        placecholder="Blog Title"
                    />
                </Box>
                <Box mb={2}>
                    <InputFiled
                        name="description"
                        form={form}
                        rules={{ required: true }}
                        variant="outlined"
                        placecholder="Short description"
                        multiline
                        rows={4}
                    />
                </Box>
                <Box mb={2}>
                    <InputFiled
                        name="image"
                        form={form}
                        rules={{ required: true }}
                        variant="outlined"
                        placecholder="Blog image"
                    />
                </Box>
                <Box mb={2}>
                    <SelectField
                        name="category"
                        form={form}
                        rules={{ required: true }}
                        placecholder="Category"
                        data={CATEGORY_DATA}
                    />
                </Box>
                <WrapQuill mb={2}>
                    <ReactQuill
                        className="qill-body"
                        theme="snow"
                        value={content}
                        onChange={handleChange}
                    />
                </WrapQuill>
                <LButton type="submit">Submit</LButton>
            </form>
        </Template>
    )
}
const LButton = styled(Button)`
    background-color: ${shades.special[100]};
    color: #fff;
    font-weight: bold;
    texttransform: 'unset';
    margin-right: 10px;
    &:hover {
        background-color: ${shades.primary[500]};
        border-color: ${shades.special[100]};
        color: ${shades.special[100]};
`
const WrapQuill = styled(Box)`
    & .qill-body .ql-container {
        min-height: 350px;
    }
`

export default DashBoard
