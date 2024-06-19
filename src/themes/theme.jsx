import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#00517d",
      dark: "#003a5c",
    },
    secondary: {
      main: "#007cba",
    },
    background: {
      default: "#EFEFEF",
    },
    text: {
      primary: "#212121",
      lightColor: "#FEFEFE",
    },
  },
  typography: {
    fontFamily: ['"Work Sans", sans-serif'],
  },
});
