import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")).cartItems
            : [],
        total: localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")).total
            : 0,
        tax: 0.08,
        price: localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")).price
            : 0,
        quantity: localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")).quantity
            : 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const index = state.cartItems.findIndex(
                (cartItem) => cartItem._id === item._id
            );
            if (index >= 0) {
                state.cartItems[index].quantity += item.quantity;
            } else {
                state.cartItems.push(item);
            }
            state.total += item.price * item.quantity;
            state.quantity += item.quantity;
        },
        removeFromCart: (state, action) => {
            const index = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            state.cartItems.splice(index, 1);
            state.total -= action.payload.price * action.payload.quantity;
            state.quantity -= action.payload.quantity;
        },
        increaseQuantity: (state, action) => {
            const index = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            state.cartItems[index].quantity += 1;
            state.total += action.payload.price;
            state.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const index = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            state.quantity -= 1;
            if (state.cartItems[index].quantity === 0) {
                state.cartItems.splice(index, 1);
                state.total -= action.payload.price;
            } else {
                state.cartItems[index].quantity -= 1;
                state.total -= action.payload.price;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.total = 0;
            state.quantity = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;