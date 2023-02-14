import React, { useState, useContext, useMemo } from 'react'
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
import { useNavigate } from 'react-router-dom'
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
type Props = {
    data?: Ipost
    isEdit?: boolean
}

type TPostForm = {
    title: string
    description: string
    category: 'accessory' | 'travel' | 'food'
    image: string
}
function BlogForm({ data, isEdit }: Props) {
    const navigate = useNavigate()
    const context = useContext(PostContext)
    const [content, setContent] = useState(data && isEdit ? data?.body : '')

    const form = useForm<TPostForm>({
        defaultValues:
            data && isEdit
                ? {
                      title: data.title,
                      description: data.description,
                      image: data.image,
                      category: data.category,
                  }
                : {
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

    const postData = async (dataForm: TPostForm) => {
        const payload = {
            ...dataForm,
            body: content,
        }
        if (isEdit && data?._id) {
            try {
                const postUpdate = await context?.updatePost(data?._id, payload)
                if (postUpdate) {
                    form.setValue('title', postUpdate.title)
                    form.setValue('description', postUpdate.description)
                    form.setValue('image', postUpdate.image)
                    form.setValue('category', postUpdate.category)
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                await context?.createPost(payload)
                navigate('/dashboard')
            } catch (error) {
                console.error(error)
            }
        }
    }

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
                <LButton type="submit">{isEdit ? 'Update' : 'Submit'}</LButton>
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

export default BlogForm
