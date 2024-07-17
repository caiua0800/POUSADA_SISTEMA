// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Login/authSlice';
import clientReducer from './reducers/Cliente/clientReducer'; 
import cadastroSlice from './reducers/Cliente/cadastroSlice'; 
import ReservasSlice from './reducers/Reserva/ReservasSlice';
import reservarSlice from './reducers/Reserva/reservarSlice';
import loadingSlice from './reducers/Load/loadingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer, 
    cadastro: cadastroSlice,
    reservas: ReservasSlice,
    reservar: reservarSlice,
    loading: loadingSlice,
  },
});

export default store;
