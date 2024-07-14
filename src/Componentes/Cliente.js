// Cliente.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal'; // Importe o componente Modal
import { useDispatch } from 'react-redux';
import { deleteCliente } from '../Redux/reducers/Cliente/clientReducer'; // Ajuste o caminho para o seu reducer

export default function Cliente({ cliente }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleted, setDeleted] = useState(false); // Estado para controlar se o cliente foi excluído
    const dispatch = useDispatch();

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteCliente(cliente.id))
            .then(() => {
                console.log('Cliente excluído com sucesso');
                setDeleted(true); // Marca que o cliente foi excluído com sucesso
                setTimeout(() => {
                    window.location.href = '/clientes'; // Redireciona para a página de clientes após 1 segundo
                }, 1000);
            })
            .catch((error) => {
                console.error('Erro ao excluir cliente:', error.message);
            });

        handleCloseModal(); // Feche o modal após a exclusão
    };

    if (!cliente) {
        return <ClienteContainer>Selecione um cliente para visualizar os detalhes.</ClienteContainer>;
    }

    return (
        <ClienteContainer>
            <ComponentTitle>CLIENTE</ComponentTitle>
            <ClienteNome>{cliente.NOME}</ClienteNome>

            <ClienteBox>
                <BoxTitle>DADOS DO CLIENTE</BoxTitle>

                <ClienteData>
                    <div>
                        <p>Nome: </p><span>{cliente.NOME}</span>
                    </div>
                    <div>
                        <p>CPF: </p><span>{cliente.CPF}</span>
                    </div>
                    <div>
                        <p>Contato: </p><span>{cliente.CONTATO}</span>
                    </div>
                    <div>
                        <p>Rua: </p><span>{cliente.ENDERECO?.RUA}</span>
                    </div>
                    <div>
                        <p>Nº: </p><span>{cliente.ENDERECO?.N}</span>
                    </div>
                    <div>
                        <p>Bairro: </p><span>{cliente.ENDERECO?.BAIRRO}</span>
                    </div>
                    <div>
                        <p>CEP: </p><span>{cliente.ENDERECO?.CEP}</span>
                    </div>
                    <div>
                        <p>CIDADE: </p><span>{cliente.ENDERECO?.CIDADE}</span>
                    </div>
                    <div>
                        <p>Data de Nascimento: </p><span>{cliente.DATADENASCIMENTO}</span>
                    </div>
                </ClienteData>
            </ClienteBox>

            <MenuOptions>
                <button className='cancelarBtn' onClick={handleDelete}>EXCLUIR CLIENTE</button>
                <button className='editarBtn'>EDITAR CLIENTE</button>
            </MenuOptions>

            {modalOpen && (
                <Modal onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
            )}

            {deleted && (
                <Message>Cliente excluído com sucesso!</Message>
            )}
        </ClienteContainer>
    );
}

// Estilos omitidos para brevidade

const Message = styled.p`
    color: #00ff00; /* Cor verde para indicar sucesso */
    margin-top: 10px;
`;

const ClienteContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;

    background: linear-gradient(to right, #000814, #001D3D, #000814);
`;

const ComponentTitle = styled.h1`
    margin: 0;
    margin-top: 30px;
    color: #90e0ef;
`;

const ClienteNome = styled.h4`
    margin: 0;
    color: #ade8f4;
`;

const ClienteBox = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    box-sizing: border-box;
    padding: 20px 30px;
    align-items: center;
    flex-direction: column;
`;

const BoxTitle = styled.h5`
    margin: 0;
    width: 100%;
    margin-top: 20px;
    font-size: 18px;
    color: #ffff;
    text-align: center;
    border-bottom: 2px solid #ffff;
`;

const ClienteData = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    div {
        width: 100%;
        display: flex;
        gap: 5px;

        p {
            margin: 0;
            color: #ffff;
            font-weight: 600;
        }

        span {
            margin: 0;
            color: rgba(255, 255, 255, 0.6);
        }
    }
`;

const MenuOptions = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    gap: 10px;

    button {
        height: 40px;
        border: 0;
        cursor: pointer;
        font-weight: 800;
    }

    .cancelarBtn {
        background: linear-gradient(to right, #850a0a, red, #850a0a);
        color: rgba(0, 0, 0, 0.7);
    }

    .editarBtn {
        color: rgba(0, 0, 0, 0.7);
        background: linear-gradient(to right, #0096c7, #48cae4, #0096c7);
    }
`;
