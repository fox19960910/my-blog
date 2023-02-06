import styled from '@emotion/styled/types/base'
import { Box } from '@mui/system'
import React from 'react'

type Props = {
    size?: 'sm' | 'md' | 'lg'
}

function PostTemplate({ size }: Props) {
    const thumbnailSize = () => {
        switch (size) {
            case 'sm':
                return 150
            case 'md':
                return 200
            case 'lg':
                return 300
        }
    }
    return (
        <Box
            sx={{
                backgroundImage:
                    "url('https://new.axilthemes.com/demo/react/blogar/images/posts/lifestyle-post-01.webp?imwidth=640')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '100%',
                minHeight: thumbnailSize(),
                padding: size === 'lg' ? '24px' : '18px',
                color: '#fff',
            }}
        >
            <Box mb={2} sx={{ typography: 'h5' }}>
                category
            </Box>
            <Box sx={{ typography: size === 'lg' ? 'h3' : 'h4' }}>
                Fashion Young Handsome Man in Casual Watch
            </Box>
        </Box>
    )
}

export default PostTemplate
