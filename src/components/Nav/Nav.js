import React, { Component } from 'react';
// import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { Creators as AuthActions } from "../../store/ducks/auth";
import './Nav.css';

// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Logout'];

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorElNav: null,
            anchorElUser: null,
            redirect: null
        };
    }

    handleOpenNavMenu = (event) => {
        this.setState({
            anchorElNav: event.currentTarget
        });
    };

    handleOpenUserMenu = (event) => {
        this.setState({
            anchorElUser: event.currentTarget
        })
    };

    handleCloseNavMenu = () => {
        this.setState({
            anchorElNav: null
        });
    };

    handleCloseUserMenu = () => {
        this.setState({
            anchorElUser: null
        })
    };

    handleLogout = async () => {
        await this.props.logout();
        this.props.auth.then(result => {
            if (!result.isAuthenticated) {
                window.location.href = "/login";
            }
        })
    }

    handleGoHome = () => {
        window.location.href = "/";
    }

    render() {
        // if (this.state.redirect) {
        //     return <Navigate to={this.state.redirect} />
        // }
        return <AppBar position="static" id="appbar" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        id="homeIcon"
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        onClick={this.handleGoHome}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(this.state.anchorElNav)}
                            onClose={this.handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))} */}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page}
          </Button>
        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={this.state.anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(this.state.anchorElUser)}
                            onClose={this.handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={this.handleLogout}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);