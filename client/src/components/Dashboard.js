import React, { useContext, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { makeStyles } from "@material-ui/core/styles";
import AddBike from "./AddBike";
import { BikesContext } from "./BikesContext";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import PayloadContext from "./PayloadContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  headCell: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

const Dashboard = () => {
  const { bikes, setBikes } = useContext(BikesContext);
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/bikes/${id}`);
      setBikes((data) => data.filter(({ _id }) => _id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Toolbar disableGutters className={classes.toolbar}>
          <ButtonGroup
            variant="contained"
            color="secondary"
            size="small"
            aria-label="contained primary button group"
            disableElevation
          >
            <Button component={Link} to={`${url}`}>
              All
            </Button>

            <Button
              component={Link}
              to={`${url}/new`}
              // endIcon={<AddRoundedIcon size="small" />}
            >
              Add new
            </Button>
          </ButtonGroup>
        </Toolbar>
        <Switch>
          <Route exact path={`${path}`}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headCell}>Brand</TableCell>
                    <TableCell className={classes.headCell}>Model</TableCell>
                    <TableCell className={classes.headCell} align="right">
                      Year
                    </TableCell>
                    <TableCell className={classes.headCell} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bikes.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {row.brand}
                      </TableCell>
                      <TableCell>{row.model}</TableCell>
                      <TableCell align="right">{row.year || "N/A"}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="delete bike"
                          component="span"
                          size="small"
                          onClick={() => deleteItem(row._id)}
                        >
                          <DeleteRoundedIcon fontSize="small" color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Route>
          <Route path={`${path}/new`}>
            <PayloadContext>
              <AddBike />
            </PayloadContext>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default Dashboard;
