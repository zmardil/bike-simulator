import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: grey[700],
        main: grey[800],
        dark: grey[900],
      },
      secondary: {
        light: lightBlue["A100"],
        main: lightBlue["A400"],
        dark: lightBlue["A700"],
      },
      accent: {
        light: blueGrey[50],
        main: blueGrey[100],
        dark: blueGrey[200],
      },
    },
    typography: {
      fontFamily: "Hind Siliguri",
    },
    shape: {
      // borderRadius: 6,
    },

    //overrides
    overrides: {
      MuiCssBaseline: {
        "@global": {},
      },
      MuiDialogContent: {},
      MuiDialogActions: {},
      MuiAppBar: {
        root: {
          border: "none",
        },
      },
      MuiDrawer: {},
      MuiButton: {
        root: {
          textTransform: "none",
        },
      },
      MuiPaper: {
        outlined: {
          // border: "1px solid rgba(101, 31, 255, 0.2)",
        },
      },
      MuiChip: {
        sizeSmall: {
          borderRadius: "4px",
        },
      },
      MuiListItem: {},
    },

    //props
    props: {
      MuiCheckbox: {
        disableRipple: true,
      },
      MuiButton: {
        disableRipple: true,
        disableElevation: true,
      },
      MuiIcon: {
        disableRipple: true,
      },
      MuiPaper: {
        elevation: 0,
        variant: "outlined",
      },
      MuiTextField: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
        InputLabelProps: {
          shrink: true,
        },
      },
      MuiListItem: {
        disableRipple: true,
      },
      MuiIconButton: {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
    },
  })
);

export default theme;
