import React, { createContext, useReducer, useContext } from 'react';

// Create a context
const ShoppingBasketContext = createContext();

// Initial state for the shopping basket
const initialState = {
  items: [],
};

// Reducer function to handle actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_BASKET':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR_BASKET':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Create a provider component
export const ShoppingBasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToBasket = (item) => {
    dispatch({ type: 'ADD_TO_BASKET', payload: item });
  };

  const removeFromBasket = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: itemId });
  };

  const clearBasket = () => {
    dispatch({ type: 'CLEAR_BASKET' });
  };

  return (
    <ShoppingBasketContext.Provider
      value={{
        basket: state,
        addToBasket,
        removeFromBasket,
        clearBasket,
      }}
    >
      {children}
    </ShoppingBasketContext.Provider>
  );
};

// Create a custom hook for using the shopping basket context
export const useShoppingBasket = () => {
  return useContext(ShoppingBasketContext);
};
