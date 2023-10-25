import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../utils/api";
import {useDispatch, useSelector} from 'react-redux'
import {setPage, setCategory,  fetchProducts} from '../store/product.slice'
import { Box } from "@mui/material";

export const ProductsList = (props) => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.product.currentPage);
  const categoryId = useSelector(state => state.product.categoryId);  
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const ProductsPerPage = 12;

  useEffect(() => {
    // Calculate the offset based on the current page and number of products per page

    getProducts(currentPage, ProductsPerPage, categoryId).then((data) => {
      setProducts(data.data);
      setTotalPages(data.totalPages);
    });
  }, [currentPage, categoryId, dispatch]);

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
    height: "100vh",
    padding: "10px",
    margin: "50px",
    // Adjust as needed
    // Add other CSS styles as needed
  };
  return (
    <div >
      <Box sx={{ display: "flex", justifyContent:'flex-end', left:300, float:"right"}}>
      <div style={containerStyle}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        </div>
      </Box>  
      <div>
       <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
