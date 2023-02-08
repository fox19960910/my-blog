import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
type Props = {
    size?: 'sm' | 'md' | 'lg'
}
function Logo({ size = 'md' }: Props) {
    const navigate = useNavigate()
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
                cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
        >
            Tim.
        </Box>
    )
}

export default Logo
