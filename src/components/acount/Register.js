import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PostApiService from "../../api/postResponse";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Nav from "../layout/nav/Nav";
import Sideheader from "../layout/Sideheader/Sideheader";
import Box from "@material-ui/core/Box";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link, Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { reactLocalStorage } from "reactjs-localstorage";
import "./index.css";



class Register extends Component {
  
  state = {
    selectedDate: new Date("2014-08-18T21:11:54"),
    usertype: [{ type: "normal" }, { type: "admin" }],
    alert: "none",
    send2login:false,
    errormsg: "Hello Thanks, for coming Taskmanager ",
    alerttype: 'info'
  };



  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: event.target.elements.fullname.value,
      designation: event.target.elements.udesignation.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      usertype: event.target.elements.usertype.value
    };
    PostApiService.acountResponse("register", payload).then((resp) => {
      if (resp.success) {
        this.setState({ send2login: true });
      }else{
        console.log("Error messgae");
        this.setState({ errormsg: resp.message, alerttype: "error" });
      }
    });
  };
  render() {
    if(this.state.send2login){
      return <Redirect to="/login" />;
    }
    if (reactLocalStorage.get("token")) {
    
      return (
        <div >
        <Nav />
        <Sideheader />
        <main >
      <div className="account">
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: "500px", height: "500px", padding: "20px"  }}
        >
          <Typography>
            <span
              style={{
                marginTop: "10px",
                color: "#333232",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Add User
            </span>
          </Typography>
          <br />
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Full name "
                  name="fullname"
                  id="fullname"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Designation "
                  name="udesignation"
                  id="udesignation"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  id="size-small-outlined"
                  size="small"
                  options={this.state.usertype}
                  getOptionLabel={(option) => option.type}
                  defaultValue={this.state.usertype[13]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Type"
                      name="usertype"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="email "
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <OutlinedInput
                  fullWidth
                  margin="dense"
                  type={this.state.showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  endAdornment={
                    <InputAdornment>
                      <IconButton onClick={this.handleClickShowPassword}>
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  fullWidth
                  className="account-btn"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
      </main>
      </div>
    )};
  }
}

export default Register;
