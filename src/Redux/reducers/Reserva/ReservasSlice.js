import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../database/firebaseConfig';

const initialState = {
    reservas: [],
    status: 'idle',
    error: null,
};

export const fetchReservas = createAsyncThunk('reservas/fetchReservas', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'RESERVAS'));
        const reservas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return reservas;
    } catch (error) {
        console.error("Houve um erro ao tentar buscar as reservas: ", error.message);
        throw error; // Lança o erro para que o createAsyncThunk possa lidar com isso
    }
});

export const deleteReserva = createAsyncThunk('reservas/deleteReserva', async (reservaId) => {
    try {
        await deleteDoc(doc(db, 'RESERVAS', reservaId));
        return reservaId;
    } catch (error) {
        console.error("Houve um erro ao deletar a reserva: ", error.message);
        throw error; // Lança o erro para que o createAsyncThunk possa lidar com isso
    }
});

export const editReserva = createAsyncThunk(
    'reservas/editReserva',
    async (reserva) => {
        const { id, ...data } = reserva;
        try {
            const reservaRef = doc(db, 'RESERVAS', id);
            await updateDoc(reservaRef, data);
            return reserva;
        } catch (error) {
            console.error('Erro ao editar reserva:', error.message);
            throw error; // Lança o erro para que o createAsyncThunk possa lidar com isso
        }
    }
);

const reservasSlice = createSlice({
    name: 'reservas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReservas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reservas = action.payload;
            })
            .addCase(fetchReservas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteReserva.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteReserva.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reservas = state.reservas.filter(reserva => reserva.id !== action.payload);
            })
            .addCase(deleteReserva.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editReserva.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editReserva.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.reservas.findIndex(reserva => reserva.id === action.payload.id);
                if (index !== -1) {
                    state.reservas[index] = action.payload;
                }
            })
            .addCase(editReserva.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllReservas = (state) => state.reservas.reservas;

export default reservasSlice.reducer;
