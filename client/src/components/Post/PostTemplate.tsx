import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
type Props = {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'image' | 'row' | 'column'
    post: Ipost
}

function PostTemplate({ size, post, variant = 'column' }: Props) {
    const thumbnailSize = () => {
        switch (size) {
            case 'sm':
                return 150
            case 'md':
                return 200
            case 'lg':
                return 300
            default:
                return 1
        }
    }
    const { title, image, category, _id, description } = post

    const renderContent = () => {
        switch (variant) {
            case 'image':
                return (
                    <WrapPost
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            height: '100%',
                            minHeight: thumbnailSize(),
                            padding: size === 'lg' ? '24px' : '18px',
                            color: '#fff',
                            borderRadius: '10px',
                        }}
                    >
                        <ImagePost src={image} alt={title} />
                        <Box mb={2} sx={{ typography: 'h5' }}>
                            {category}
                        </Box>
                        <Box
                            sx={{ typography: size === 'lg' ? 'h3' : 'h4' }}
                            className="post-title"
                        >
                            {title}
                        </Box>
                    </WrapPost>
                )
            case 'column':
                return (
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height={thumbnailSize()}
                                image={image}
                                alt={title}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                {category}
                            </Button>
                        </CardActions>
                    </Card>
                )
            case 'row':
                return (
                    <Card sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    29 March 2021
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    pl: 1,
                                    pb: 1,
                                }}
                            ></Box>
                        </Box>
                        <img
                            width="127px"
                            height={
                                thumbnailSize() === 1
                                    ? '127px'
                                    : thumbnailSize()
                            }
                            src={image}
                            alt={title}
                            style={{ display: 'block' }}
                        />
                    </Card>
                )
        }
    }
    return (
        <PostLink to={'/post/' + _id} target="_blank">
            {renderContent()}
        </PostLink>
    )
}

const PostLink = styled(Link)`
    color: #fff;
    text-decoration: none;
`
const ImagePost = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: 0.3s ease-in;
    filter: grayscale(0.5);
`
const WrapPost = styled(Box)`
    position: relative;
    overflow: hidden;
    & .post-title {
        transition: 0.3s ease-in;
        text-decoration: none;
        font-weight: bold;
    }
    &:hover .post-title {
        text-decoration: underline;
    }
    &:hover img {
        transform: scale(1.1);
        filter: grayscale(0);
    }
`

export default PostTemplate
