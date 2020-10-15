import { createSlice, Draft } from '@reduxjs/toolkit';
import { IState, IStatePizza } from 'interfaces';

const initialState = {
  items: [],
  deliveryCost: 5, // for example
  totalQuantity: 0,
  total: 0,
  currency: 'us',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: Draft<IState>, action) => {
      const { id, name, description, price, currency } = action.payload;
      const currentPrice = price[currency];
      const { items } = state;
      const existedItem = items.find((item) => item.id === id);

      if (existedItem) {
        existedItem.quantity += 1;
        existedItem.totalPrice += currentPrice;
      } else {
        items.push({
          id,
          name,
          description,
          price,
          quantity: 1,
          totalPrice: currentPrice,
        });
      }
      state.total += currentPrice;
      state.totalQuantity += 1;
    },

    addQuantity: (state: Draft<IState>, action) => {
      const addedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (addedItem) {
        addedItem.quantity += 1;
        addedItem.totalPrice += addedItem.price[state.currency];
        state.total += addedItem.price[state.currency];
        state.totalQuantity += 1;
      }
    },

    subQuantity: (state: Draft<IState>, action) => {
      const addedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (addedItem) {
        if (addedItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
          state.total -= addedItem.price[state.currency];
          state.totalQuantity -= 1;
        } else {
          addedItem.quantity -= 1;
          addedItem.totalPrice -= addedItem.price[state.currency];
          state.total -= addedItem.price[state.currency];
          state.totalQuantity -= 1;
        }
      }
    },

    setCurrency: (state, action) => {
      const currency = action.payload;
      state.currency = currency;

      state.total = 0;

      state.items.forEach((item: IStatePizza) => {
        item.totalPrice = item.price[currency] * item.quantity;
        state.total += item.totalPrice;
      });
    },

    resetCart: () => initialState,
  },
});

// TODO any
export const selectCart = (state: Draft<any>) => state.cart;

export const {
  addItem,
  addQuantity,
  subQuantity,
  setCurrency,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
