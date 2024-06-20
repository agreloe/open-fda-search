import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Button,
} from "@mui/material";

export const ThemedTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "light",
})(({ theme, light }) => ({
  fontFamily: '"Manrope", sans-serif',
  color: light ? theme.palette.text.lightColor : theme.palette.text.primary,
}));

export const ThemedInput = styled(TextField)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  backgroundColor: "#fff",

  "& label.MuiInputLabel-root ": {
    color: theme.palette.text.primary,
  },

  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
}));

export const ThemedButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Manrope", sans-serif',
  color: theme.palette.text.lightColor,
  backgroundColor: theme.palette.primary.main,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));