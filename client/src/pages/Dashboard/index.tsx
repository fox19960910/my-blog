import React from 'react'
import Template from '../../components/layouts/Template'
import PostTemplate from '../../components/Post/PostTemplate'
import Grid from '@mui/material/Grid'
type Props = {}

function DashBoard({}: Props) {
    return (
        <Template>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={6}
                    sx={{ borderRadius: '10px', overflow: 'hidden' }}
                >
                    <PostTemplate size="lg" />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {' '}
                            <PostTemplate size="sm" />
                        </Grid>
                        <Grid item xs={6}>
                            {' '}
                            <PostTemplate size="sm" />
                        </Grid>
                        <Grid item xs={6}>
                            {' '}
                            <PostTemplate size="sm" />
                        </Grid>
                        <Grid item xs={6}>
                            {' '}
                            <PostTemplate size="sm" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Template>
    )
}

export default DashBoard
