import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'service' | 'formation' | 'product';
  image?: string;
  description?: string;
  duration?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  lastUpdated: string;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  lastUpdated: new Date().toISOString(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.lastUpdated = new Date().toISOString();
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.lastUpdated = new Date().toISOString();
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
        state.lastUpdated = new Date().toISOString();
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.lastUpdated = new Date().toISOString();
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Bulk operations
    addMultipleItems: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach(newItem => {
        const existingItem = state.items.find(item => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      });
      state.lastUpdated = new Date().toISOString();
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    // Cart analytics
    getCartSummary: (state) => {
      const summary = {
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        itemCountByType: state.items.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + item.quantity;
          return acc;
        }, {} as Record<string, number>),
        averageItemPrice: state.totalItems > 0 ? state.totalPrice / state.totalItems : 0,
        mostExpensiveItem: state.items.reduce((max, item) => 
          item.price > max.price ? item : max, state.items[0] || null),
      };
      return summary;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  calculateTotals,
  addMultipleItems,
  getCartSummary,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalItems = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartSummary = (state: { cart: CartState }) => cartSlice.getInitialState();
