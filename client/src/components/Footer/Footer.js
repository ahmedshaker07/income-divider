
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Toolbar from "@material-ui/core/Toolbar";

const styles = {
  footer: {
    backgroundColor: "#212121"
  },
  container: {
    justifyContent: "space-between"
  },
  rights: {
    color: "white",
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: "1%"
  }
}
const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Toolbar className={classes.container}>
        <IconButton href='https://github.com/ahmedshaker07' target="_blank">
          <GitHubIcon color="primary" />
        </IconButton>
        <p className={classes.rights}>2021. All Rights Reserved</p>
      </Toolbar>
    </footer>
  );
}
