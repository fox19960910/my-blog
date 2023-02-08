import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Logo from '../Base/Logo'
import { AuthContext } from '../../contexts/AuthContext'
import styled from '@emotion/styled'
import { shades } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'

const pages = ['Blog']

const SETTINGS = [
    { action: 'profile', name: 'Profile' },
    { action: 'account', name: 'Account' },
    { action: 'dashboard', name: 'Dashboard' },
    { action: 'logout', name: 'Logout' },
]

function Header() {
    const context = React.useContext(AuthContext)
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = (action: string) => {
        setAnchorElUser(null)
        switch (action) {
            case 'logout':
                context?.logOut()
                break
            case 'dashboard':
                navigate('/dashboard')
                break
            default:
                return null
        }
    }

    const userName = context?.user?.username[0]
    return (
        <AppBar
            position="static"
            sx={{
                background: '#fff',
                color: shades.primary[500],
                boxShadow: 'unset',
                borderBottom: `1.75px solid ${shades.primary[50]}`,
            }}
        >
            <Container
                sx={{ width: '90%', maxWidth: '1140px', margin: '0 auto' }}
            >
                <Toolbar disableGutters>
                    {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Logo />
                    </Box> */}

                    <Box
                        sx={{
                            flexGrow: 1,
                            // display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            // display: { xs: 'flex', md: 'none' },
                            mr: 1,
                            flexGrow: 1,
                        }}
                    >
                        <Logo />
                    </Box>

                    {/* <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box> */}

                    <Box sx={{ flexGrow: 0 }}>
                        {context?.user ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar>{userName}</Avatar>
                                        <Typography
                                            variant="h4"
                                            color={shades.primary[500]}
                                            sx={{
                                                marginLeft: 1,
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {context?.user?.username}
                                        </Typography>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {SETTINGS.map((setting) => (
                                        <MenuItem
                                            key={setting.action}
                                            onClick={() =>
                                                handleCloseUserMenu(
                                                    setting.action
                                                )
                                            }
                                        >
                                            <Typography textAlign="center">
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Box>
                                <LButton
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/login')}
                                >
                                    Log in
                                </LButton>
                                <SButton
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                >
                                    Sign up
                                </SButton>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const LButton = styled(Button)`
    background-color: ${shades.special[100]};
    color: #fff;
    font-weight: bold;
    texttransform: 'unset';
    margin-right: 10px;
    border-color: ${shades.special[100]};
    &:hover {
        background-color: ${shades.primary[500]};
        border-color: ${shades.special[100]};
        color: ${shades.special[100]};
`
const SButton = styled(Button)`
    border-color: ${shades.special[100]};
    color: ${shades.special[100]};
    font-weight: bold;
    texttransform: 'unset';
    &:hover {
        background-color: ${shades.special[100]};
        border-color: ${shades.special[100]};
        color: #fff;
    }
`

export default Header
