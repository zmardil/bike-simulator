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

const SettingMeta = (props) => {
  const { title, value, metric } = props;
  return (
    <Box display="flex">
      <Typography
        id="body-size-slider"
        variant="subtitle2"
        color="textSecondary"
        style={{ flexGrow: 1 }}
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        id="body-size-slider"
        variant="subtitle2"
        color="textSecondary"
        gutterBottom
      >
        {value} {metric}
      </Typography>
    </Box>
  );
};

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
        <SettingMeta title="Body size" value={settings.bodySize} metric="cm" />
        <Slider
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
        <SettingMeta
          title="Arm angle"
          value={settings.armAngleMax}
          metric="&#176;"
        />
        <Slider
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
        <SettingMeta
          title="Seating position"
          value={settings.driverOffset}
          metric="cm"
        />
        <Slider
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

        <Box my={2} display="flex">
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ flexGrow: 1 }}
            gutterBottom
          >
            Foot on Ground
          </Typography>
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
        </Box>

        <Typography
          id="body-size-slider"
          variant="h6"
          color="primary"
          gutterBottom
        >
          Pillion
        </Typography>
        <SettingMeta
          title="Pillion height"
          value={settings.pillionSize}
          metric="cm"
        />
        <Slider
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
        <SettingMeta
          title="Pillion position"
          value={settings.pillionPosition}
          metric="cm"
        />
        <Slider
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
        <Box my={2} display="flex">
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ flexGrow: 1 }}
            gutterBottom
          >
            Show/Hide Pillion
          </Typography>
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
        </Box>
        <Box my={2} display="flex">
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ flexGrow: 1 }}
            gutterBottom
          >
            show/Hide Arms
          </Typography>
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
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
