// clientReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../database/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const initialState = {
    clients: [],
    status: 'idle',
    error: null,
};

export const fetchClientes = createAsyncThunk('clients/fetchClients', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'CLIENTES'));
        const clients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return clients;
    } catch (error) {
        console.error('Erro ao carregar clientes:', error.message);
        throw error;
    }
});

export const deleteCliente = createAsyncThunk(
    'clients/deleteCliente',
    async (clientId) => {
        try {
            await deleteDoc(doc(db, 'CLIENTES', clientId));
            return clientId;
        } catch (error) {
            console.error('Erro ao excluir cliente:', error.message);
            throw error;
        }
    }
);

export const editCliente = createAsyncThunk(
    'clients/editCliente',
    async (cliente) => {
        const { id, ...data } = cliente;
        try {
            const clientRef = doc(db, 'CLIENTES', id);
            await updateDoc(clientRef, data);
            return cliente;
        } catch (error) {
            console.error('Erro ao editar cliente:', error.message);
            throw error;
        }
    }
);

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        // Adicione reducers síncronos aqui, se necessário
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClientes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clients = action.payload;
            })
            .addCase(fetchClientes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteCliente.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCliente.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clients = state.clients.filter(client => client.id !== action.payload);
            })
            .addCase(deleteCliente.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editCliente.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editCliente.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.clients.findIndex(client => client.id === action.payload.id);
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }
            })
            .addCase(editCliente.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllClients = (state) => state.clients.clients;

export default clientSlice.reducer;
