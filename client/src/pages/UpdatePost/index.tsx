import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Base/Loading'
import BlogForm from '../../components/Form/BlogForm'
import Template from '../../components/layouts/Template'
import { PostContext } from '../../contexts/PostContext'

function UpdatePost() {
    const context = useContext(PostContext)
    const [myDetailPost, setMyDetailPost] = useState<Ipost | undefined>()
    const { id } = useParams()
    useEffect(() => {
        ;(async () => {
            if (id) {
                const response = await context?.getDetailPost(id)
                if (response) setMyDetailPost(response)
            }
        })()
    }, [id])

    if (context?.postLoading) {
        return <Loading />
    }
    if (!myDetailPost) {
        return <div>Not found</div>
    }
    return <BlogForm data={myDetailPost} isEdit />
}

export default UpdatePost
