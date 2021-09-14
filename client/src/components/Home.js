import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";

import { BikesContext } from "./BikesContext";

const useHeroStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1591216105236-5ba45970702a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80)",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    position: "relative",
    "&::before": {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,.3)",
    },
  },
  heroTitle: {
    textTransform: "uppercase",
    fontSize: theme.typography.h1.fontSize,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
  },
  heroSubtitle: {
    color: theme.palette.common.white,
  },
}));

const Hero = () => {
  const classes = useHeroStyles();
  return (
    <Paper elevation={0} className={classes.hero}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        my={20}
      >
        <Typography className={classes.heroTitle} variant="h3">
          Street Biker
        </Typography>
        <Typography variant="h4" className={classes.heroSubtitle} gutterBottom>
          Motorcycle Simulator
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          style={{ color: "white" }}
          endIcon={<KeyboardArrowRightRoundedIcon />}
          component={Link}
          to="/simulator"
        >
          Simulation
        </Button>
      </Box>
    </Paper>
  );
};

const useHomeStyles = makeStyles((theme) => ({
  about: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
}));

const Home = () => {
  const { bikes } = useContext(BikesContext);
  const classes = useHomeStyles();
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Hero />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="body1"
              style={{ borderBottom: "1px solid #ddd", paddingBottom: "20px" }}
              gutterBottom
            >
              Recent Bike Simulations
            </Typography>
            <List dense={true}>
              {bikes &&
                bikes.slice(0, 5).map(({ _id, brand, model }, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={<Link to={`/simulator/${_id}`}>{model}</Link>}
                      secondary={brand}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.about}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography paragraph>
                A simulator for motorcycles and scooters. You can simulate the
                seat position and seat height for you and your passenger/social
                on different types of bikes and adjust the parameters such as
                body height or arm angle to suit your needs. The simulator
                calculates several ergonomic relevant values like knee angle,
                hip angle, seat height and body inclination individually for
                your specifications.
              </Typography>
              <Typography paragraph>
                So we supports you in your search for a suitable bike without
                having to test ride all bikes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box
              my={20}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h6" gutterBottom>
                Find more fresh new bikes from the simulator
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                endIcon={<KeyboardArrowRightRoundedIcon />}
                style={{ marginTop: "20px" }}
                component={Link}
                to="/simulator"
              >
                Go to Simulation
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
