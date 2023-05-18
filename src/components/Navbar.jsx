import { AppBar, Container, Toolbar } from '@mui/material';
import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../context/UserContext';
import NavLogo from './NavLogo';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

// TODO Replace items below with the actual routes


const pagesLoggedIn = [
    ["ViewRecipe", "/viewrecipe"],
    ["Page2", "/"],
    ["Page3", "/"],
]
const pagesLoggedOut = [
    ["Sign Up", "/signup"],
    ["Login", "/login"],
]
const settings = [
    ['Profile', "/"],
    ['Account', "/"],
    ['Logout', "/logout"]
];

export default function Navbar({ logMeOut }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate()

    const { user } = useContext(UserContext)


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (url) => {
        setAnchorElNav(null);
        if (url) { navigate(url); }
    };

    const handleCloseUserMenu = (url) => {
        setAnchorElUser(null);
        if (url) { navigate(url); }

    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#fff4dd", color: "black" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link style={{ textDecoration: "none" }} to="/">
                            <Typography
                                variant="div"
                                noWrap
                                onClick={() => navigate("/")}
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                }}
                            >
                                <NavLogo />
                            </Typography>
                        </Link>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                // color="inherit"
                                color="black"
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
                                onClose={()=>handleCloseNavMenu()}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {(Object.keys(user).length ? pagesLoggedIn : pagesLoggedOut).map(([pageTitle, url]) => (
                                    <MenuItem key={pageTitle} onClick={() => handleCloseNavMenu(url)}>
                                        <Typography textAlign="center">{pageTitle}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="div"
                            noWrap
                            onClick={() => navigate("/")}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            <NavLogo />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {(Object.keys(user).length ? pagesLoggedIn : pagesLoggedOut).map(([pageTitle, url]) => (
                                <Button
                                    key={pageTitle}
                                    onClick={() => handleCloseNavMenu(url)}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {pageTitle}
                                </Button>
                            ))}
                        </Box>

                        {
                        Object.keys(user).length ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <RestaurantMenuIcon color="secondary" sx={{ width: "40px", height: "40px", p: 0}} />
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
                                    onClose={() => handleCloseUserMenu()}
                                >
                                    {settings.map(([settingTitle, url]) => (
                                        <MenuItem key={settingTitle} onClick={() => handleCloseUserMenu(url)}>
                                            <Typography textAlign="center">{settingTitle}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            :
                            <Box sx={{ flexGrow: 0 }}>
                                <RestaurantMenuIcon sx={{ width: "40px", height: "40px", p: 0, color: "white" }} />
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <br />
        </>
    )
}