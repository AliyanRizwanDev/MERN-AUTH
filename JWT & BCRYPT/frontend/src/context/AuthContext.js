import React, { createContext, useReducer } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { user: action.payload };
    case 'logout':
      return { user: null };
    default:
      return state;
  }
};

// Create the AuthProvider component
export default function AuthProvider({ children }) {
  const initialState = { user: null }; // Define the initial state

  const [state, dispatch] = useReducer(reducer, initialState); // Use useReducer hook

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
