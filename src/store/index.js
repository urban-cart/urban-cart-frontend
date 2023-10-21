import categorySlice from './category.slice';
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {  // reducers
        category: categorySlice,
    },  
});