import React from "react";
import Nav from "../nav/Nav";
import Sideheader from "../Sideheader/Sideheader";
import { makeStyles } from "@material-ui/core/styles";
import Alluser from "../../todo/alltodo/Alluser";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    marginTop:"100px",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Allusers(props) {
    const classes = useStyles();
    if(!reactLocalStorage.get('token')){
      return(
        <Redirect to="/login" />
      )
    }

    return (
      <div className={classes.root}>
        <Nav />
        <Sideheader />
        <main className={classes.content}>
          <Alluser/>
        </main>
      </div>
    );
}

export default Allusers;
