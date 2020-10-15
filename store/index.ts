import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import currencyReducer from './slices/currencySlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
  },
  devTools: true,
});
