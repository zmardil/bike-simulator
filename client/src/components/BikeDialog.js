import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles({});

const BikeDialog = (props) => {
  const classes = useStyles();
  const { onClose, setSelectedBike, open, data } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleItemClick = (value) => {
    setSelectedBike(value);
    onClose(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 0,
        variant: "outlined",
      }}
    >
      <DialogTitle id="simple-dialog-title">Choose Bike to compare</DialogTitle>
      {/* <TableContainer component={Paper}> */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((datum, idx) => (
              <TableRow
                key={idx}
                hover
                onClick={() => handleItemClick(datum._id)}
              >
                <TableCell component="th" scope="row">
                  {datum.brand}
                </TableCell>
                <TableCell>{datum.model}</TableCell>
                <TableCell>{datum.year || "N/A"}</TableCell>
                <TableCell>{datum.type || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};

BikeDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default BikeDialog;
