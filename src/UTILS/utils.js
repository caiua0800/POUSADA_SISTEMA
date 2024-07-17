import { db } from '../database/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export const updateClienteHaverInfo = async (codigoCliente, contemHaver, haverValor) => {
    try {
        const clienteRef = doc(db, 'CLIENTES', codigoCliente);
        await updateDoc(clienteRef, {
            CONTEMHAVER: contemHaver,
            HAVERVALOR: haverValor
        });
        console.log(`Campos atualizados para o cliente ${codigoCliente}`);
    } catch (error) {
        console.error('Erro ao atualizar campos:', error);
        throw new Error('Erro ao atualizar campos do cliente: ', error);
    }
};
