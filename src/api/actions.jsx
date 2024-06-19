import axios from "axios";

const API_BASE_URL = "https://api.fda.gov/drug/drugsfda.json";

export const fetchAllDrugs = async (query, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  try {
    const response = await axios.get(
      `${API_BASE_URL}?search=openfda.generic_name:${query}&skip=${skip}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const searchDrugDetails = async (applicationNumber) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?search=application_number:${applicationNumber}&limit=1`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching drug details", error);
    throw error;
  }
};

export const autocompleteDrugs = async (query) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?search=openfda.generic_name:${query}*&limit=5`
    );
    const results = response.data.results || [];
    const genericNames = results.flatMap((result) => {
      if (result.openfda && result.openfda.generic_name) {
        return result.openfda.generic_name;
      }
      return [];
    });
    return [...new Set(genericNames)];
  } catch (error) {
    console.error("Error fetching autocomplete data", error);
    throw error;
  }
};
