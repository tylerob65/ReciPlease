import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import NavLogo from './NavLogo';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const pagesLoggedIn = [
  ["Home", "/"],
  ["Add Recipe", "/addrecipe"],
  ["Random Recipe", "/viewrandomrecipe"],
  ["Ingredients Search", "/searchbyingredients"],
]
const pagesLoggedOut = [
  ["Home", "/"],
  ["Random Recipe", "/viewrandomrecipe"],
  ["Sign Up", "/signup"],
  ["Login", "/login"],
]
const settings = [
  ['Profile', "/myprofile"],
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
    <AppBar position="static" sx={{ backgroundColor: "lightsecondary.main", color: "black", mb: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* NavLogo Large Screen */}
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

          {/* NavMenu Small Screen */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* Icon for NavMenu*/}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>

            {/* Small Screen NavMenu Popup */}
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
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Contents of Small Screen NavMenu */}
              {(Object.keys(user).length ? pagesLoggedIn : pagesLoggedOut).map(([pageTitle, url]) => (
                <MenuItem key={pageTitle} onClick={() => handleCloseNavMenu(url)}>
                  <Typography textAlign="center">{pageTitle}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Small Screen NavLogo */}
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

          {/* Large Screen Menu Items */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(Object.keys(user).length ? pagesLoggedIn : pagesLoggedOut).map(([pageTitle, url]) => (
              <Button
                key={pageTitle}
                onClick={() => handleCloseNavMenu(url)}
                color="secondary"
                sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
              >
                {pageTitle}
              </Button>
            ))}
          </Box>

          {/* Right Side Button Based on whether user is logged in */}
          {Object.keys(user).length ?

            // When logged in - Right Side Menu Button
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <RestaurantMenuIcon color="secondary" sx={{ width: "40px", height: "40px", p: 0 }} />
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
            // Hides icon when not logged in
            <Box sx={{ flexGrow: 0 }}>
              <RestaurantMenuIcon color="lightsecondary" sx={{ width: "40px", height: "40px", p: 0 }} />
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}