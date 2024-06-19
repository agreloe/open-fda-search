import React, { useEffect, useState, Fragment } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  ListItem,
  List,
  ListItemText,
  Grid,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { searchDrugDetails } from "../api/actions";
import { useParams } from "react-router-dom";
import { ThemedTypography } from "./CustomComponents";

function DrugDetails() {
  const { state } = useLocation();
  const { query, results, page, totalPages, tab } = state;
  const navigate = useNavigate();
  const { applicationNumber } = useParams();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchDrugDetails(applicationNumber)
      .then((result) => {
        setResult(result.results[0]);
      })
      .catch((error) => {
        console.error("Error fetching drug details", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [applicationNumber]);

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <ThemedTypography variant="h4" sx={{ marginBottom: 2 }}>
        Drug Details
      </ThemedTypography>
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={200}
          animation="wave"
          sx={{ bgcolor: "grey.300" }}
        />
      ) : result && result.openfda ? (
        <Card>
          <CardContent>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6}>
                <ThemedTypography variant="h6">Brand Name:</ThemedTypography>
                <Typography>
                  {result.openfda?.brand_name?.length
                    ? result.openfda.brand_name
                        .map((name) => name)
                        .join(", ") || "No brand name"
                    : result.openfda.brand_name || "No brand name"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">
                  Manufacturer Name:
                </ThemedTypography>
                <Typography>
                  {result.openfda?.manufacturer_name?.length
                    ? result.openfda.manufacturer_name
                        .map((name) => name)
                        .join(", ") || "No manufacturer name"
                    : result.openfda.manufacturer_name ||
                      "No manufacturer name"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">Generic Name:</ThemedTypography>
                <Typography>
                  {result.openfda?.generic_name?.length
                    ? result.openfda.generic_name
                        .map((name) => name)
                        .join(", ") || "No generic name"
                    : result.openfda.generic_name || "No generic name"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">
                  Substance Name:
                </ThemedTypography>
                <Typography>
                  {result.openfda?.substance_name?.length
                    ? result.openfda.substance_name
                        .map((name) => name)
                        .join(", ") || "No substance name"
                    : result.openfda.substance_name || "No substance name"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">Pharm Class:</ThemedTypography>
                <Typography>
                  {result.openfda?.pharm_class_cs?.length
                    ? result.openfda.pharm_class_cs
                        .map((name) => name)
                        .join(", ") || "No pharm class"
                    : result.openfda.pharm_class_cs || "No pharm class"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">Sponsor:</ThemedTypography>
                <Typography>{result.sponsor_name || "No sponsor"}</Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">Route:</ThemedTypography>
                <Typography>
                  {result.openfda?.route?.length
                    ? result.openfda.route.map((name) => name).join(", ") ||
                      "No route"
                    : result.openfda.route || "No route"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ThemedTypography variant="h6">Product Type:</ThemedTypography>
                <Typography>
                  {result.openfda?.product_type?.length
                    ? result.openfda.product_type
                        .map((name) => name)
                        .join(", ") || "No product type"
                    : result.openfda.product_type || "No product type"}
                </Typography>
              </Grid>
            </Grid>

            {result.products && result.products.length > 0 && (
              <Fragment>
                <ThemedTypography variant="h6" marginTop={2}>
                  Products:
                </ThemedTypography>
                <Grid container>
                  <Grid item sx={{ width: "100%" }}>
                    <List>
                      {result.products.map((product, index) => (
                        <ListItem
                          divider={result.products.length > 1 ? true : false}
                          disableGutters
                          key={index}
                          sx={{ width: "100%" }}
                        >
                          <Box>
                            <Typography>{product.brand_name}</Typography>

                            <ListItemText
                              secondary={`Dosage Form: ${product.dosage_form}`}
                            ></ListItemText>
                            <ListItemText
                              secondary={`Route: ${product.route}`}
                            ></ListItemText>

                            {product.active_ingredients.length > 0 ? (
                              <ListItemText
                                secondary={`Active Ingredients: ${product.active_ingredients
                                  .map((ingredient) => ingredient.name)
                                  .join(", ")}`}
                              ></ListItemText>
                            ) : (
                              <ListItemText
                                secondary={`Active Ingredients: No active ingredients`}
                              ></ListItemText>
                            )}

                            <Chip label={product.marketing_status}></Chip>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            {result.products.map((product, index) => (
              <Grid
                key={index}
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={6}>
                  <ThemedTypography variant="h6">Brand name:</ThemedTypography>
                  <Typography>
                    {product.brand_name || "No brand name"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <ThemedTypography variant="h6">Sponsor:</ThemedTypography>
                  <Typography>{result.sponsor_name || "No sponsor"}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <ThemedTypography variant="h6">Dosage form:</ThemedTypography>
                  <Typography>
                    {product.dosage_form || "No dosage form"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <ThemedTypography variant="h6">Route:</ThemedTypography>
                  <Typography>{product.route || "No route"}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <ThemedTypography variant="h6">
                    Marketing Status:
                  </ThemedTypography>
                  <Chip
                    label={product.marketing_status || "No marketing status"}
                    sx={{ marginTop: 1 }}
                  ></Chip>
                </Grid>

                <Grid item xs={6} key={index}>
                  <ThemedTypography variant="h6">
                    Active ingredients:
                  </ThemedTypography>
                  {product.active_ingredients.length > 0 ? (
                    product.active_ingredients.map((ingredient, ingIndex) => (
                      <List key={ingIndex}>
                        <ListItem
                          disableGutters
                          disablePadding
                          divider={
                            product.active_ingredients.length > 1 ? true : false
                          }
                        >
                          <ListItemText
                            primary={ingredient.name}
                            secondary={ingredient.strength}
                          ></ListItemText>
                        </ListItem>
                      </List>
                    ))
                  ) : (
                    <Typography>No active ingredients</Typography>
                  )}
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          navigate("/", { state: { query, results, page, totalPages, tab } })
        }
        sx={{ marginTop: 2 }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default DrugDetails;
