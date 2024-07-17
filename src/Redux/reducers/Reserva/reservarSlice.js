import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../database/firebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';

const initialState = {
    status: 'idle',
    error: null,
};

export const FazerReserva = createAsyncThunk(
    'reservas/FazerReserva', // Nome da action para dispatch
    async (novaReserva) => {
        try {
            const reservasRef = collection(db, 'RESERVAS');
            await addDoc(reservasRef, novaReserva);
            return novaReserva;
        } catch (error) {
            console.error('Erro ao fazer reserva:', error.message);
            throw error;
        }
    }
);

const reservarSlice = createSlice({
    name: 'reservas', // Nome do slice
    initialState,
    reducers: {
        resetReservaStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(FazerReserva.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(FazerReserva.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(FazerReserva.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetReservaStatus } = reservarSlice.actions;

export default reservarSlice.reducer;
