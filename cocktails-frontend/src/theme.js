import {createTheme} from "@material-ui/core";
import {blueGrey} from "@material-ui/core/colors";

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: "outlined",
      fullWidth: true,
      color: "secondary",
    },
  },
  palette: {
    secondary: {
      main: blueGrey[800],
    }
  }
});

export default theme;