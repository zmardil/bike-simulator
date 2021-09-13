import React, { useContext, useState } from "react";
import Editor from "./Editor";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Typography } from "@material-ui/core";
import { PayloadContext } from "./PayloadContext";

import { BikesContext } from "./BikesContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  editorContainer: {
    minHeight: 400,
    padding: theme.spacing(2),
    display: "grid",
    placeItems: "center",
  },
  data: {
    padding: theme.spacing(4, 3),
  },
}));

const AddBike = () => {
  const { values, setValues } = useContext(PayloadContext);
  const { setBikes } = useContext(BikesContext);
  const classes = useStyles();
  const [img, setImg] = useState(null);
  const [position, setPosition] = React.useState("handleBar");

  const handleSubmit = async () => {
    if (!(img && values.filename && values.image_url)) return;
    try {
      const { data } = await axios.post(`/bikes`, values);
      setBikes((x) => [...x, data]);
      setValues({
        ...values,
        model: "",
        brand: "",
        year: "",
        filename: "",
        image_url: "",
      });
      setImg(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const fd = new FormData();
      fd.append("image", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const {
        data: { filename, path },
      } = await axios.post("/bikes/upload", fd, config);
      const img = new Image();
      setValues((values) => ({ ...values, image_url: path, filename }));
      img.src = `/uploads/${filename}`;
      img.onload = () => setImg(img);
    }
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "10px" }}>
      <Grid item xs={12} md={8} style={{ flexGrow: 1 }}>
        <Paper elevation={0} variant="outlined">
          <div className={classes.editorContainer}>
            {img ? (
              <Editor img={img} selectedPos={position} />
            ) : (
              <Button variant="contained" component="label" size="small">
                Upload Image
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleChange}
                  hidden
                />
              </Button>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={0} variant="outlined" className={classes.data}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">Bike Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Model"
                value={values.model}
                size="small"
                onChange={(e) =>
                  setValues({ ...values, model: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Brand"
                value={values.brand}
                size="small"
                onChange={(e) =>
                  setValues({ ...values, brand: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Year"
                value={values.year}
                size="small"
                onChange={(e) => setValues({ ...values, year: e.target.value })}
              />
            </Grid>
            {img && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Positions</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ToggleButtonGroup
                    // orientation="vertical"
                    value={position}
                    exclusive
                    onChange={(e, value) => setPosition(value)}
                    size="small"
                  >
                    <ToggleButton value="handleBar" aria-label="position">
                      Handle Bar
                    </ToggleButton>
                    <ToggleButton value="driverSeat" aria-label="position">
                      Seat
                    </ToggleButton>
                    <ToggleButton value="driverFootPeg" aria-label="position">
                      Foot Peg
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Pillion</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ToggleButtonGroup
                    // orientation="vertical"
                    value={position}
                    exclusive
                    onChange={(e, value) => setPosition(value)}
                    size="small"
                  >
                    <ToggleButton value="pillionSeat" aria-label="position">
                      Seat
                    </ToggleButton>
                    <ToggleButton value="pillionFootPeg" aria-label="position">
                      Foot Peg
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddBike;
