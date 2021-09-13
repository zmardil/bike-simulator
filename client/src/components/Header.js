import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const classes = useStyles();

  const handleLogout = async (e) => {
    try {
      await axios.delete("/auth/logout");
      setIsAuthenticated(false);
    } catch {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="lg">
      <Toolbar className={classes.root} disableGutters>
        <Typography variant="h6" className={classes.title}>
          <Typography variant="h6" component="span">
            StreetBiker
          </Typography>
          &nbsp;
          <Typography variant="body2" component="span">
            Simulator
          </Typography>
        </Typography>

        {isAuthenticated && (
          <Button
            color="inherit"
            size="small"
            variant="outlined"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </Container>
  );
};

export default Header;
