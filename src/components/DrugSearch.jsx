import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  Pagination,
  Autocomplete,
  Divider,
  Skeleton,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAllDrugs, autocompleteDrugs } from "../api/actions";
import {
  ThemedInput,
  ThemedTypography,
  ThemedButton,
} from "./CustomComponents";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../themes/theme";

function DrugSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setPage(1);
    setTotalPages(1);
    setError(false);
    window.history.replaceState({}, "", location.pathname);
  };

  useEffect(() => {
    if (location.state && location.state.results) {
      const { query, results, page, totalPages, tab } = location.state;
      setQuery(query || "");
      setResults(results || []);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
      setTab(tab || 0);
    } else {
      handleClear();
    }
  }, [location.state]);

  const fetchResults = async (query, page = 1) => {
    setLoading(true);
    try {
      const data = await fetchAllDrugs(query, page);
      const results = data.results;
      setResults(results);
      setTotalPages(
        Math.ceil(data.meta.results.total / data.meta.results.limit)
      );
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError(true);
      return;
    }
    setPage(1);
    await fetchResults(query);
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
    await fetchResults(query, value);
  };

  const handleItemClick = (result) => {
    navigate(`/details/${result.application_number}`, {
      state: { query, results, page, totalPages, tab },
    });
  };

  const handleInputChange = async (event, value) => {
    setError(false);
    setQuery(value);
    if (value) {
      try {
        const autoResults = await autocompleteDrugs(value);
        setOptions(autoResults);
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      }
    } else {
      setOptions([]);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const openfdaResults = results.filter((result) => result.openfda?.brand_name);
  const otherResults = results.filter((result) => !result.openfda?.brand_name);

  return (
    <ThemeProvider theme={appTheme}>
      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <ThemedTypography variant="h4" sx={{ marginBottom: 2 }}>
          Drug Search
        </ThemedTypography>
        <Autocomplete
          freeSolo
          options={options}
          inputValue={query}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <ThemedInput
              {...params}
              label="Search for a drug"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              error={error}
              helperText={error ? "Input cannot be empty" : ""}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <ThemedButton
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </ThemedButton>
          {results.length > 0 && (
            <ThemedButton
              variant="contained"
              color="primary"
              onClick={handleClear}
            >
              Clear search
            </ThemedButton>
          )}
        </Box>
        {results.length > 0 && (
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Available" disabled={openfdaResults.length === 0} />
            <Tab label="Discontinued" disabled={otherResults.length === 0} />
          </Tabs>
        )}
        <List sx={{ padding: "2rem 0" }}>
          {loading ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Skeleton variant="rectangular" height={40} animation="wave" />
              <Skeleton variant="rectangular" height={40} animation="wave" />
              <Skeleton variant="rectangular" height={40} animation="wave" />
            </Box>
          ) : tab === 0 ? (
            openfdaResults.length > 0 ? (
              openfdaResults.map((result, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={() => handleItemClick(result)}>
                    <ListItemText
                      primary={result.openfda?.brand_name || "No brand name"}
                      secondary={
                        result.openfda?.manufacturer_name || "No dosage form"
                      }
                    />
                  </ListItemButton>
                  <Divider variant="fullWidth" component="li" />
                </Fragment>
              ))
            ) : (
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  No results to show
                </Typography>
              </Container>
            )
          ) : otherResults.length > 0 ? (
            otherResults.map((result, index) => (
              <Fragment key={index}>
                <ListItemButton onClick={() => handleItemClick(result)}>
                  <ListItemText
                    primary={result.sponsor_name || "No sponsor"}
                    secondary="No details available"
                  />
                  <Chip label="Discontinued" />
                </ListItemButton>
                <Divider variant="fullWidth" component="li" />
              </Fragment>
            ))
          ) : (
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" gutterBottom>
                No results to show
              </Typography>
            </Container>
          )}
        </List>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default DrugSearch;
