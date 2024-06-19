import React, { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../themes/theme";
import { ThemedTypography } from "./CustomComponents";
import logo from "../assets/openFDA-logo.svg";

const ScrollTop = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

const Header = (props) => {
  return (
    <ThemeProvider theme={appTheme}>
      <Fragment>
        <CssBaseline enableColorScheme />
        <AppBar>
          <Toolbar>
            <a
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img src={logo} alt="OpenFDA Logo" width="32" height="32" />
              <ThemedTypography
                light="true"
                variant="button"
                display="block"
                color="text.secondary"
                sx={{ fontFamily: "typography.fontFamily" }}
              >
                Open FDA Search
              </ThemedTypography>
            </a>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />

        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Fragment>
    </ThemeProvider>
  );
};

export default Header;
