import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../database/firebaseConfig';
import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';

const initialState = {
    status: 'idle',
    error: null,
};

export const cadastrarCliente = createAsyncThunk(
    'cadastro/cadastrarCliente',
    async (novoCliente) => {
        try {
            const { CPF } = novoCliente;

            // Verificar se já existe um cliente com o mesmo CPF
            const clientesRef = collection(db, 'CLIENTES');
            const queryCliente = query(clientesRef, where('CPF', '==', CPF));
            const querySnapshot = await getDocs(queryCliente);

            if (!querySnapshot.empty) {
                throw new Error('Já existe um cliente com este CPF.');
            }

            // Se não houver cliente com o mesmo CPF, cadastrar
            await setDoc(doc(clientesRef, CPF), novoCliente); // Usando setDoc com o ID do CPF
            return novoCliente;
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error.message);
            throw error;
        }
    }
);

const cadastroSlice = createSlice({
    name: 'cadastro',
    initialState,
    reducers: {
        resetCadastroStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(cadastrarCliente.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(cadastrarCliente.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(cadastrarCliente.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetCadastroStatus } = cadastroSlice.actions;

export default cadastroSlice.reducer;
