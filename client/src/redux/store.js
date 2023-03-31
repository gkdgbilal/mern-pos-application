import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export default configureStore({
    reducer: {
        // Add your reducers here
        cart: cartReducer
    }
})