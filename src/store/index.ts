import productSlice from './product.slice';
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {  // reducers
        product: productSlice,
    },  
});