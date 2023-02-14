import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Chip, Divider, Stack, Typography, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import Loading from '../../components/Base/Loading'
import { MainHeading } from '../../components/Base/Typograpy'
import PostTemplate from '../../components/Post/PostTemplate'
import Template from '../../components/layouts/Template'
import { PostContext } from '../../contexts/PostContext'
import { shades } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
    const navigate = useNavigate()
    const postContext = useContext(PostContext)

    useEffect(() => {
        postContext?.getMyPost()
    }, [])

    if (postContext?.postLoading) {
        return <Loading />
    }
    if (!postContext?.myposts) {
        return <div>Post not found</div>
    }

    return (
        <Template>
            <Box display="flex" height="100vh" sx={{ marginTop: '-60px' }}>
                <Box
                    sx={{
                        borderRight: `1.75px solid  ${shades.primary[50]}`,
                        padding: '30px 30px 0 0',
                    }}
                >
                    {/* topic */}
                    <Box mb={2} display="flex" justifyContent="space-between">
                        <Stack
                            direction="row"
                            spacing={2}
                            mb={2}
                            alignItems="center"
                        >
                            <Typography variant="h4">Topic:</Typography>
                            <Chip label="Travel" />
                            <Chip label="Food" />
                            <Chip label="Accesory" />
                        </Stack>

                        <Box>
                            <OutlinedInput
                                id="search"
                                size="medium"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                }
                                placeholder="search..."
                                sx={{ borderRadius: 20, minWidth: 300 }}
                            />
                            <IconButton
                                onClick={() => navigate('/create-post')}
                            >
                                <AddCircleOutlineIcon
                                    fontSize="large"
                                    sx={{
                                        marginLeft: 2,
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box mb={2}>
                        <MainHeading title="My Post" />
                    </Box>

                    <Divider
                        variant="middle"
                        sx={{ marginLeft: 0, marginRight: 0 }}
                    />

                    {postContext?.myposts.map((item) => (
                        <Box>
                            <Box mt={3} mb={3} key={item._id}>
                                <PostTemplate
                                    href="/update-post/"
                                    post={item}
                                    own
                                />
                            </Box>
                            <Divider
                                variant="middle"
                                sx={{ marginLeft: 0, marginRight: 0 }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Template>
    )
}

export default DashBoard
