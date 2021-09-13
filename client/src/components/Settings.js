import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const Settings = (props) => {
  const classes = useStyles();
  const { settings, setSettings } = props;

  return (
    <div>
      <div className={classes.toolbar} />
      <Box mx={3}>
        <Typography
          id="body-size-slider"
          variant="h6"
          color="primary"
          gutterBottom
        >
          Rider
        </Typography>
        <Typography
          id="body-size-slider"
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          Body Size
        </Typography>
        <Slider
          name="lineWidth"
          onChange={(e, value) =>
            setSettings((prev) => ({ ...prev, bodySize: value }))
          }
          value={settings.bodySize}
          min={140}
          max={210}
          step={1}
          size="small"
          ria-labelledby="body-size-slider"
        />
        <Typography
          id="arm-angle-slider"
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          Arm Angle
        </Typography>
        <Slider
          name="lineWidth"
          onChange={(e, value) =>
            setSettings((prev) => ({ ...prev, armAngleMax: value }))
          }
          value={settings.armAngleMax}
          min={0}
          max={120}
          step={5}
          size="small"
          ria-labelledby="arm-angle-slider"
        />
        <Typography
          id="driver-seat-position-slider"
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          Seating Position
        </Typography>
        <Slider
          name="lineWidth"
          onChange={(e, value) =>
            setSettings((prev) => ({ ...prev, driverOffset: value }))
          }
          value={settings.driverOffset}
          min={-30}
          max={30}
          step={5}
          size="small"
          ria-labelledby="driver-seat-position-slider"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                size="small"
                checked={settings.footOnGround}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footOnGround: !settings.footOnGround,
                  }))
                }
              />
            }
            labelPlacement="start"
            label={
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Foot On Ground
              </Typography>
            }
          />
        </FormGroup>

        <Typography
          id="body-size-slider"
          variant="h6"
          color="primary"
          gutterBottom
        >
          Passenger
        </Typography>
        <Typography
          id="pillion-size-position-slider"
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          Pillion Height
        </Typography>
        <Slider
          name="lineWidth"
          onChange={(e, value) =>
            setSettings((prev) => ({ ...prev, pillionSize: value }))
          }
          value={settings.pillionSize}
          min={100}
          max={210}
          step={1}
          size="small"
          ria-labelledby="pillion-size-position-slider"
        />
        <Typography
          id="pillion-position-slider"
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
        >
          Seating Position
        </Typography>
        <Slider
          name="lineWidth"
          onChange={(e, value) =>
            setSettings((prev) => ({ ...prev, pillionPosition: value }))
          }
          value={settings.pillionPosition}
          min={-30}
          max={30}
          step={5}
          size="small"
          ria-labelledby="pillion-position-slider"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                size="small"
                checked={settings.showPillion}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    showPillion: !settings.showPillion,
                  }))
                }
              />
            }
            labelPlacement="start"
            label={
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                {settings.showPillion ? "Hide" : "Show"} Pillion
              </Typography>
            }
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                size="small"
                checked={settings.showArms}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    showArms: !settings.showArms,
                  }))
                }
              />
            }
            labelPlacement="start"
            label={
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Pillion Arms
              </Typography>
            }
          />
        </FormGroup>
      </Box>
    </div>
  );
};

export default Settings;
