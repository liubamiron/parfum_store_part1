import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCookie} from "../utils/apiCalls";
import axios from "axios";


let x = getCookie('Authorization')
const headers = {'Authorization': x, 'Content-type': 'application/json; charset=UTF-8'}


export const fetchCarts = createAsyncThunk(
    'carts/fetchCarts',
    async function (_, {rejectWithValue}) {

        try {
            const response = await fetch('https://giterbackend.azurewebsites.net/api/order/cart/',
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Authorization': x
                    },
                })
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

//delete goods item from cart/redux
export const deleteGoods = createAsyncThunk(
    'carts/deleteGoods',
    async function (product, {rejectWithValue, dispatch}) {
        try {
            const itemToDelete = JSON.stringify({
                item_c_code: `${product.item_c_code}`,
                name: `${product.name}`,
                price: `${product.price}`,
                point: `${product.point}`,
                count: `${product.count}`,
            })
            const response = await fetch(`https://giterbackend.azurewebsites.net/api/order/remove-from-cart/`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': x,
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: itemToDelete,
            });
            if (response.ok) {
                const response = await fetch('https://giterbackend.azurewebsites.net/api/order/cart/', {
                    method: 'GET',
                    headers: {
                        'Authorization': x,
                        'Access-Control-Allow-Credentials': true,
                        'Content-type': 'application/json',
                    },
                })
                const data = await response.json();
                dispatch(removeGoods(data));
            } else {
                console.log('Server error');
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

//increase items in cart redux

export const incrementGoods = createAsyncThunk(
    'carts/incrementGoods',
    async function (product, {rejectWithValue, dispatch}) {
        try {
            const itemToIncrement = JSON.stringify({
                item_c_code: `${product.item_c_code}`,
                name: `${product.name}`,
                price: `${product.price}`,
                point: `${product.point}`,
                count: +1,
            })
            const response = await fetch(`https://giterbackend.azurewebsites.net/api/order/add-to-cart/`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': x,
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: itemToIncrement,
            });
            // console.log('cart_error', response);
            if (response.ok) {
                const response = await fetch('https://giterbackend.azurewebsites.net/api/order/cart/', {
                    method: 'GET',
                    headers: {
                        'Authorization': x,
                        'Access-Control-Allow-Credentials': true,
                        'Content-type': 'application/json',
                    },
                })
                const data = await response.json();
                dispatch(increaseCart(data));
            } else {
                console.log('Server error');
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

//decrement
export const decrementGoods = createAsyncThunk(
    'carts/decrementGoods',
    async function (product, {rejectWithValue, dispatch}) {
        try {
            const itemToIncrement = JSON.stringify({
                item_c_code: `${product.item_c_code}`,
                name: `${product.name}`,
                price: `${product.price}`,
                point: `${product.point}`,
                count: -1,
            })
            const response = await fetch(`https://giterbackend.azurewebsites.net/api/order/add-to-cart/`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': x,
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: itemToIncrement,
            });
            // console.log('cart_error', response);
            if (response.ok) {
                const response = await fetch('https://giterbackend.azurewebsites.net/api/order/cart/', {
                    method: 'GET',
                    headers: {
                        'Authorization': x,
                        'Access-Control-Allow-Credentials': true,
                        'Content-type': 'application/json',
                    },
                })
                const data = await response.json();
                dispatch(decreaseCart(data));
            } else {
                console.log('Server error');
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);


// add goods in shopping cart

export const addNewGood = createAsyncThunk(
    'carts/addNewGood',
    async function ({product}, {rejectWithValue, dispatch}) {
        try {
            const newGoods = JSON.stringify({
                item_c_code: product._id,
                name: `${product.goods_name} ${product.goods_number}, ${product.goods_volume}`,
                price: product.prices[0].price,
                point: product.goods_point,
                count: 1,
            })
            const response = await fetch('https://giterbackend.azurewebsites.net/api/order/add-to-cart/', {
                method: 'POST',
                headers: {
                    'Authorization': x,
                    'Access-Control-Allow-Credentials': true,
                    'Content-type': 'application/json',
                },
                body: newGoods,
            })

            if (response.ok) {
                const response = await fetch('https://giterbackend.azurewebsites.net/api/order/cart/', {
                    method: 'GET',
                    headers: {
                        'Authorization': x,
                        'Access-Control-Allow-Credentials': true,
                        'Content-type': 'application/json',
                    },
                })
                const data = await response.json();
                console.log('response get', data)
                dispatch(addGoodsItem(data));

            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}
const initialState = {
    carts: []
};
//const extraReducers = createExtraReducers();

const cartSlice = createSlice({
    name: 'carts',
    initialState,
    status: null,
    error: null,
    reducers: {
        reset: () => initialState,

        addGoodsItem(state, action) {
            state.carts = action.payload;
        },
        removeGoods(state, action) {
            state.carts = action.payload;
        },
        increaseCart(state, action) {
            state.carts = action.payload;
        },
        decreaseCart(state, action) {
            state.carts = action.payload;
        },
    },

   // extraReducers
    extraReducers: {
        [fetchCarts.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchCarts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.carts = action.payload;
        },
        [fetchCarts.rejected]: setError,
        [deleteGoods.rejected]: setError,
    },

});

//
// function createExtraReducers() {
//     return (builder) => {
//         builder
//             .addCase(fetchCarts.pending,(state)=> {
//                 state.status = 'loading';
//                 state.error = null;
//             })
//             .addCase(fetchCarts.fulfilled,(state)=> {
//                 state.status = 'loading';
//                 state.error = null;
//             })
//             .addCase (fetchCarts.rejected, (state, action)=> {
//                 state.status = 'rejected';
//                 state.error = action.payload;
//             })
//             .addCase (deleteGoods.rejected, (state, action)=> {
//                 state.status = 'rejected';
//                 state.error = action.payload;
//             })
//
//     }}

const {removeGoods, addGoodsItem, increaseCart, decreaseCart, } = cartSlice.actions;
export default cartSlice.reducer;