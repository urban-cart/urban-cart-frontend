import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from '../utils/api';

const initialState = {
    products: [],
    currentPage: 0,
    categoryId: null,
    user: null,
    secretToken: null,
    refreshToken: null,
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
        },
        setToken: (state, action) => {
            state.secretToken = action.payload.secretToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', state.user );
        },
    },
});

export const {setPage, setCategory,  fetchProducts, setToken, setUser} = productSlice.actions;

export default productSlice.reducer;