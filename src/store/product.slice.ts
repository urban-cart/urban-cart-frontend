import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from '../utils/api';

const initialState = {
    products: [],
    currentPage: 0,
    categoryId: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: { // actions
        setPage: (state, action) => {
            state.currentPage = action.payload
        },
        setCategory: (state, action) => {
            state.categoryId = action.payload;
        },
        fetchProducts:(state,action)=>{
            state.products = getProducts(action.payload.currentPage, action.payload.productsPerPage, action.payload.categoryId);
        }
    },
});

export const {setPage, setCategory,  fetchProducts} = productSlice.actions;

export default productSlice.reducer;