import React from "react";
import Paper from "@material-ui/core/Paper";
import Canvas from "./Canvas";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    aspectRatio: 1 / 1,
    padding: "10px",
  },
  card: {
    display: "grid",
    placeItems: "center",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      display: "block",
      inset: 10,
      border: " 2px dashed #ddd",
      borderRadius: "3px",
    },
  },
  btn: {},
}));

export const AddBike = (props) => {
  const classes = useStyles();
  const { onClick } = props;
  const handleClickOpen = () => {
    onClick();
  };

  return (
    <Paper className={`${classes.root} ${classes.card}`} variant="outlined">
      <IconButton className={classes.btn} onClick={handleClickOpen}>
        <AddRoundedIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

const Bike = (props) => {
  const classes = useStyles();
  const { data, settings } = props;
  return (
    <Paper className={classes.root} elevation={0} variant="outlined">
      <Canvas settings={settings} data={data} />
    </Paper>
  );
};

export default Bike;
