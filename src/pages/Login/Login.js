import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { Navigate } from "react-router-dom";

import { Creators as LoginActions } from "../../store/ducks/auth";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FiLock } from "react-icons/fi";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: '',
      redirect: null
    };
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.login(this.state.username, this.state.password);
    this.props.auth.then(result => {
      console.log(result)
      if (result.isAuthenticated) {
        this.setState({ redirect: '/' });
        window.location.href = "/";
      }
      else
        this.setState({ error: 'Login failed! Please try again later!' });
    })
  };

  theme = createTheme();

  render() {
    // if (this.state.redirect) {
    //   return <Navigate to={this.state.redirect} />
    // }
    return (
      <ThemeProvider theme={this.theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <FiLock />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                <form>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleUsername}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handlePassword}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs>
                      <div id="error">{this.state.error}</div>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
