import React, { useContext, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import Hidden from "@material-ui/core/Hidden";
import Settings from "./Settings";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Bike, { AddBike } from "./Bike";
import BikeDialog from "./BikeDialog";
import { BikesContext } from "./BikesContext";
import { useParams } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/blueGrey";
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {},
  drawer: {
    "& .MuiDrawer-paper": {
      // background: "transparent",
      background: lightBlue[50],
    },
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // alignItems: "",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  toggleButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Simulator = (props) => {
  const { history, window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { bikes } = useContext(BikesContext);
  const { ids } = useParams();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  const params = ids ? ids.split("-") : [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (selectedBike && !params.includes(selectedBike)) {
      params.push(selectedBike);
      history.push(`/simulator/${params.join("-")}`);
    }
  }, [selectedBike]);

  const handleClose = (value) => {
    setOpen(false);
  };

  const [settings, setSettings] = React.useState({
    bodySize: 140,
    armAngleMax: 20,
    footOnGround: false,
    driverOffset: 0,
    footOffsetX: 0,
    footOffsetY: 0,
    pillionFootOffsetX: 0,
    pillionFootOffsetY: 0,
    handlebarOffsetX: 0,
    handlebarOffsetY: 0,
    showShadow: true,
    showPillion: true,
    pillionSize: 170,
    pillionPosition: 0,
    showArms: true,
  });

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open settings"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.toggleButton}
            size="small"
          >
            <TuneRoundedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Typography variant="subtitle1" component="span">
              StreetBiker
            </Typography>
            &nbsp;
            <Typography variant="subtitle2" component="span">
              Simulator
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="settings">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Settings settings={settings} setSettings={setSettings} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Settings settings={settings} setSettings={setSettings} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} style={{ padding: "20px" }}>
          {bikes &&
            params &&
            bikes.filter((datum) => params.includes(datum._id.toString())) &&
            bikes
              .filter((datum) => params.includes(datum._id.toString()))
              .map((datum, idx) => (
                <Grid item xs={12} sm={6} lg={4} key={idx}>
                  <Bike data={datum} settings={settings} />
                </Grid>
              ))}
          <Grid item xs={12} sm={6} lg={4}>
            <AddBike onClick={handleClickOpen} />
          </Grid>
        </Grid>
      </main>
      <BikeDialog
        setSelectedBike={setSelectedBike}
        data={bikes}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default Simulator;
