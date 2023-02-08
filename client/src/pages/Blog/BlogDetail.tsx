import React, { useContext, useEffect } from 'react'
import Template from '../../components/layouts/Template'
import styled from '@emotion/styled'

import { Avatar, Box, Grid, Typography } from '@mui/material'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { PostContext } from '../../contexts/PostContext'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Base/Loading'

function BlogDetail() {
    const context = useContext(PostContext)
    const { id } = useParams()
    useEffect(() => {
        if (id) context?.getDetailPost(id)
    }, [id])

    if (context?.postLoading) {
        return <Loading />
    }
    if (!context?.postDetail) {
        return <div>Not found</div>
    }
    const { title, description, category, body, image } = context?.postDetail
    return (
        <Template size="lg">
            <Box
                mb={3}
                width="85%"
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Typography variant="h1" mb={2} sx={{ textAlign: 'center' }}>
                    {title}
                </Typography>
                <Typography variant="h3" mb={3} sx={{ textAlign: 'center' }}>
                    {description}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={1}>
                        <FlexGrid item xs={4}>
                            <Avatar>H</Avatar>
                            <Typography ml={1} variant="h4">
                                Author
                            </Typography>
                        </FlexGrid>
                        <FlexGrid item xs={4}>
                            <CategoryOutlinedIcon />
                            <Typography ml={1} variant="h4">
                                {category}
                            </Typography>
                        </FlexGrid>
                        <FlexGrid item xs={4}>
                            <AccessTimeOutlinedIcon />
                            <Typography ml={1} variant="h4">
                                4 minute read
                            </Typography>
                        </FlexGrid>
                    </Grid>
                </Box>
            </Box>

            <Box mb={3}>
                <Image src={image} alt={title} />
            </Box>
            <Box
                mb={3}
                width="80%"
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                dangerouslySetInnerHTML={{ __html: body }}
            ></Box>
        </Template>
    )
}

const FlexGrid = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    width: 100%;
    max-height: 400px;
    display: block;
    object-fit: cover;
    border-radius: 5px;
`
export default BlogDetail
