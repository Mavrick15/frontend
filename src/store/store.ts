import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import uiSlice from './slices/uiSlice';
import analyticsSlice from './slices/analyticsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'], // Only persist cart and user data
  blacklist: ['ui', 'analytics'] // Don't persist UI and analytics
};

const rootReducer = combineReducers({
  cart: cartSlice,
  user: userSlice,
  ui: uiSlice,
  analytics: analyticsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
