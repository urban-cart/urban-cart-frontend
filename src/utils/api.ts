import { config } from "./config";
import axios from "axios";

async function getProducts(offset, ProductsPerPage,categoryId) {
  const apiUrl = config.baseURL + "products";
  console.log("apiUrl:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      params: {
        size: ProductsPerPage,
        page: offset,
        categoryId: categoryId,
      },
    });
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getCategories() {
  const apiUrl = config.baseURL + "categories";
  console.log("apiUrl:", apiUrl);

  try {
    const response = await axios.get(apiUrl);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function postProduct(product) {
  const apiUrl = config.baseURL + "products";
  console.log("apiUrl:", apiUrl);

  try {
    const response = await axios.post(apiUrl, product);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function postUser(user) {
  const apiUrl = config.baseURL + "auth/login";
  console.log("apiUrl:", apiUrl);

  try {
    const response = await axios.post(apiUrl, user);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export { getProducts, getCategories, postProduct, postUser };
