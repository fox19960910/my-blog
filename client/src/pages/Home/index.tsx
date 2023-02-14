import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Avatar, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Base/Loading'
import { MainHeading } from '../../components/Base/Typograpy'
import PostTemplate from '../../components/Post/PostTemplate'
import Template from '../../components/layouts/Template'
import { PostContext } from '../../contexts/PostContext'
import { stringAvatar } from '../../helper/utils'
import { shades } from '../../styles/theme'

type TArticlesType = {
    label: string
    value: string
}
function Home() {
    const postContext = useContext(PostContext)
    const [typeArticles, setArticles] = useState<TArticlesType>({
        label: 'Bookmark',
        value: 'bookmark',
    })
    useEffect(() => {
        postContext?.getAllPost()
    }, [])

    if (postContext?.postLoading) {
        return <Loading />
    }
    if (!postContext?.posts) {
        return <div>Post not found</div>
    }

    const handleChangeTypeArticles = (event: SelectChangeEvent) => {
        const value = event.target.value as string
        setArticles({ label: value.toUpperCase(), value })
    }
    return (
        <Template>
            <Box display="flex" height="100vh" sx={{ marginTop: '-60px' }}>
                <Box
                    // flex="1 1 70%"
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
                    </Box>

                    <Box mb={2} display="flex" justifyContent="space-between">
                        <MainHeading title="Article" />
                        <Select
                            value={typeArticles.value}
                            onChange={handleChangeTypeArticles}
                            autoWidth
                            size="small"
                            sx={{ borderRadius: 20 }}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={'bookmark'}>Bookmark</MenuItem>
                        </Select>
                    </Box>

                    <Divider
                        variant="middle"
                        sx={{ marginLeft: 0, marginRight: 0 }}
                    />

                    {postContext?.posts.map((item) => (
                        <Box>
                            <Box mt={3} mb={3} key={item._id}>
                                <PostTemplate post={item} />
                            </Box>
                            <Divider
                                variant="middle"
                                sx={{ marginLeft: 0, marginRight: 0 }}
                            />
                        </Box>
                    ))}
                </Box>
                {/* <Box flex="1 1 30%" sx={{ padding: '30px 0 0 30px' }}>
                    <Box mb={2}>
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
                    </Box> */}
                {/* people */}
                {/* <Box>
                        <MainHeading title="People you might be interested" />
                        {postContext?.posts.slice(3).map((item, idx) => (
                            <Box>
                                <Box mt={idx === 0 ? 3 : 0} key={item._id}>
                                    <Stack spacing={2}>
                                        <Box
                                            m={1}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            {item.user.image ? (
                                                <Avatar src={item.user.image} />
                                            ) : (
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Avatar
                                                        {...stringAvatar(
                                                            item.user.username,
                                                            {
                                                                width: 50,
                                                                height: 50,
                                                                // fontSize: 12,
                                                            }
                                                        )}
                                                    />
                                                    <Typography variant="h4">
                                                        {item.user.username}
                                                    </Typography>
                                                </Stack>
                                            )}
                                            <Button
                                                variant="outlined"
                                                sx={{ borderRadius: '20px' }}
                                            >
                                                See their posts
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        ))}
                    </Box> */}
                {/* trending post */}
                {/* <Box>
                        <MainHeading title="Treding post" />
                        {postContext?.posts.slice(3).map((item, idx) => (
                            <Box>
                                <Box mt={idx === 0 ? 3 : 0} key={item._id}>
                                    <PostTemplate post={item} variant="small" />
                                </Box>
                            </Box>
                        ))}
                    </Box> */}
                {/* </Box> */}
            </Box>
        </Template>
    )
}

export default Home
