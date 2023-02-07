import React, { useContext, useEffect } from 'react'
import Template from '../../components/layouts/Template'
import { PostContext } from '../../contexts/PostContext'
import Loading from '../../components/Base/Loading'
import Grid from '@mui/material/Grid'
import PostTemplate from '../../components/Post/PostTemplate'
import { MainHeading } from '../../components/Base/Typograpy'
function Home() {
    const postContext = useContext(PostContext)

    useEffect(() => {
        postContext?.getAllPost()
    }, [])

    if (postContext?.postLoading) {
        return <Loading />
    }
    if (!postContext?.postLoading && !postContext?.posts) {
        return <div>Post not found</div>
    }
    return (
        <Template>
            {/* Popular post */}
            <MainHeading title="Popular post" />
            <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                    <PostTemplate
                        variant="image"
                        size="lg"
                        post={postContext.posts[0]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        {postContext.posts.slice(1).map((item: Ipost) => (
                            <Grid item xs={6} key={item._id}>
                                <PostTemplate
                                    post={item}
                                    size="sm"
                                    variant="image"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* trending post  */}

            <Grid container spacing={4} mt={1}>
                <Grid item xs={8}>
                    <MainHeading title="Trending post" />
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={6}>
                            <PostTemplate
                                size="lg"
                                variant="column"
                                post={postContext.posts[0]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                {postContext.posts
                                    .slice(2)
                                    .map((item: Ipost) => (
                                        <Grid item xs={12} key={item._id}>
                                            <PostTemplate
                                                post={item}
                                                variant="row"
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Latest Posts */}
                <Grid item xs={4}>
                    <MainHeading title="Latest Posts" />
                    <Grid container spacing={2} mt={1}>
                        {postContext.posts.slice(3).map((item: Ipost) => (
                            <Grid item xs={12} key={item._id}>
                                <PostTemplate
                                    post={item}
                                    variant="image"
                                    size="md"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Template>
    )
}

export default Home
