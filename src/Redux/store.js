// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Login/authSlice';
import clientReducer from './reducers/Cliente/clientReducer'; 
import cadastroSlice from './reducers/Cliente/cadastroSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer, 
    cadastro: cadastroSlice,
  },
});

export default store;
