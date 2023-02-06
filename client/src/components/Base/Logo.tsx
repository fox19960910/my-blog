import React from 'react'
import Box from '@mui/material/Box'

type Props = {
    size?: 'sm' | 'md' | 'lg'
}
function Logo({ size = 'md' }: Props) {
    const logoSize = () => {
        switch (size) {
            case 'sm':
                return 'h3'
            case 'md':
                return 'h2'
            case 'lg':
                return 'h1'
        }
    }
    return (
        <Box
            sx={{
                typography: logoSize(),
                fontFamily: ['Itim', 'cursive'].join(','),
            }}
        >
            Tim.
        </Box>
    )
}

export default Logo
