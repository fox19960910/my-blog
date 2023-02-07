import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Template from '../../components/layouts/Template'
import { useForm } from 'react-hook-form'
type Props = {}

type TPostForm = {
    title: string
    category: string
}
function DashBoard({}: Props) {
    const [content, setContent] = useState('')
    const form = useForm<TPostForm>({
        defaultValues: {
            title: '',
            category: '',
        },
    })
    const handleChange = (value: any) => {
        setContent(value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('content', content)
        //   try {
        //     const response = await fetch('https://your-api.com/endpoint', {
        //       method: 'POST',
        //       headers: { 'Content-Type': 'application/json' },
        //       body: JSON.stringify({ content })
        //     });
        //     const data = await response.json();
        //     console.log(data);
        //   } catch (error) {
        //     console.error(error);
        //   }
    }
    return (
        <Template>
            <form onSubmit={(e) => handleSubmit(e)}>
                <ReactQuill value={content} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </Template>
    )
}

export default DashBoard
