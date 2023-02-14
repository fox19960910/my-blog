import styled from '@emotion/styled'
import { Avatar, Chip } from '@mui/material'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { stringAvatar } from '../../helper/utils'
import { shades } from '../../styles/theme'
type Props = {
    own?: boolean
    href?: string
    variant?: 'small' | 'large'
    post: Ipost
}

function PostTemplate({
    own = false,
    post,
    variant = 'large',
    href = '/post',
}: Props) {
    const { title, image, category, _id, description, user, createAt } = post
    return (
        <PostLink to={href + _id} target="_blank">
            {variant === 'large' ? (
                <Grid container spacing={3}>
                    {/* lef */}
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" mb={2}>
                            {own ? (
                                <Typography variant="h5">
                                    Last Update:
                                </Typography>
                            ) : (
                                <>
                                    {user.image ? (
                                        <Avatar src={user.image} />
                                    ) : (
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Avatar
                                                {...stringAvatar(user.username)}
                                            />
                                            <Typography variant="h5">
                                                {user.username}
                                            </Typography>
                                        </Stack>
                                    )}
                                </>
                            )}

                            <Dot />
                            <Typography
                                color={shades.primary[50]}
                                marginLeft="10px"
                            >
                                {dayjs(createAt).format('hh:mm - MM/DD/YYYY')}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {title}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography
                                variant="body2"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '4',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {description}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Chip label={category} sx={{ marginRight: 1 }} />
                            <Chip label={'4 min read'} />
                        </Box>
                    </Grid>

                    {/* right */}
                    <Grid item xs={4}>
                        <Box
                            position="relative"
                            borderRadius={3}
                            overflow="hidden"
                        >
                            <ImagePost src={image} alt={title} height="180px" />
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={3}>
                    {/* lef */}
                    <Grid item xs={5}>
                        <Box
                            position="relative"
                            borderRadius={3}
                            overflow="hidden"
                        >
                            <ImagePost src={image} alt={title} height="120px" />
                        </Box>
                    </Grid>

                    {/* right */}
                    <Grid item xs={7}>
                        <Box mb={1}>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {title}
                            </Typography>
                        </Box>
                        <Box mb={1}>
                            <Typography
                                variant="body1"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {description}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={2}>
                            {user.image ? (
                                <Avatar src={user.image} />
                            ) : (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Avatar
                                        {...stringAvatar(user.username, {
                                            width: 24,
                                            height: 24,
                                            fontSize: 12,
                                        })}
                                    />
                                    <Typography variant="body1">
                                        {user.username}
                                    </Typography>
                                </Stack>
                            )}
                            <Dot />
                            <Typography
                                color={shades.primary[50]}
                                marginLeft="10px"
                            >
                                {dayjs(createAt).format('hh:mm - MM/DD/YYYY')}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </PostLink>
    )
}

const PostLink = styled(Link)`
    color: ${shades.primary[400]};
    text-decoration: none;
`
const Dot = styled.div`
    width: 5px;
    height: 5px;
    background-color: ${shades.primary[50]};
    border-radius: 50%;
    margin-left: 10px;
`
const ImagePost = styled.img`
    display: block;
    width: 100%;
    object-fit: cover;
    transition: 0.3s ease-in;
    filter: grayscale(1);
    &:hover {
        transform: scale(1.1);
        filter: grayscale(0);
    }
`

export default PostTemplate
