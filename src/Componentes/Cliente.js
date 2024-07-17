import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal'; // Importe o componente Modal
import { useDispatch } from 'react-redux';
import { deleteCliente, editCliente } from '../Redux/reducers/Cliente/clientReducer'; // Ajuste o caminho para o seu reducer
import { setLoading } from '../Redux/reducers/Load/loadingSlice';

export default function Cliente({ cliente }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [modalEdicao, setModalEdicao] = useState(false);
    const [editedClient, setEditedClient] = useState({ ...cliente }); // Estado para armazenar as alterações do cliente
    const dispatch = useDispatch();

    const handleDelete = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAtivarLoad = async () => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
            window.location.href = '/clientes';
        }, 2000);
    };

    function formatarTelefone(numero) {
        // Remove todos os caracteres que não são dígitos
        const digitsOnly = numero.replace(/\D/g, '');

        // Verifica se o número tem pelo menos 10 dígitos
        if (digitsOnly.length >= 10) {
            return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
        }

        // Caso contrário, retorna o número sem formatação específica
        return numero;
    }


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

    const handleOpenEditModal = () => {
        const initialEditedClient = {
            ...cliente,
            ENDERECO: {
                RUA: cliente.ENDERECO?.RUA || '',
                N: cliente.ENDERECO?.N || '',
                BAIRRO: cliente.ENDERECO?.BAIRRO || '',
                CEP: cliente.ENDERECO?.CEP || '',
                CIDADE: cliente.ENDERECO?.CIDADE || '',
            },
        };
        setEditedClient(initialEditedClient);
        console.log('Opening Edit Modal with client:', initialEditedClient);
        setModalEdicao(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('ENDERECO.')) {
            const [_, key] = name.split('.');
            setEditedClient((prev) => ({
                ...prev,
                ENDERECO: {
                    ...prev.ENDERECO,
                    [key]: value,
                },
            }));
        } else {
            setEditedClient((prev) => ({
                ...prev,
                [name]: value.toUpperCase(),
            }));
        }
        console.log('Updated client state:', { ...editedClient, [name]: value });
    };

    const handleSaveEdits = () => {
        const formattedClient = {
            ...editedClient,
        };
        console.log('Salvando alterações:', formattedClient);
        setModalEdicao(false);
        dispatch(editCliente(formattedClient));
        handleAtivarLoad();
    };

    function formatarCPF(cpf) {
        // Remove todos os caracteres que não são dígitos
        const digitsOnly = cpf.replace(/\D/g, '');

        // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
        return `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}-${digitsOnly.slice(9, 11)}`;
    }


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
                        <p>CPF: </p><span>{formatarCPF(cliente.CPF)}</span>
                    </div>
                    <div>
                        <p>Contato: </p><span>{formatarTelefone(cliente.CONTATO)}</span>
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
                    <div>
                        <p>CONTÉM HAVERES: </p><span>{cliente.CONTEMHAVER ? 'SIM, R$' + cliente.HAVERVALOR  : 'NÃO'}</span>
                    </div>
                </ClienteData>
            </ClienteBox>

            <MenuOptions>
                <button className='cancelarBtn' onClick={handleDelete}>EXCLUIR CLIENTE</button>
                <button className='editarBtn' onClick={handleOpenEditModal}>EDITAR CLIENTE</button>
            </MenuOptions>

            {modalOpen && (
                <Modal onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
            )}

            {deleted && (
                <Message>Cliente excluído com sucesso!</Message>
            )}

            {modalEdicao && (
                <ModalEdicao>
                    <ModalContent>
                        <FecharModal onClick={() => { setModalEdicao(false) }}>X</FecharModal>
                        <ModalHeader>EDITAR INFORMAÇÕES</ModalHeader>
                        <ModalBody>
                            <div>
                                <h2>CPF <p>(não pode ser editado)</p></h2>
                                <span>{cliente && cliente.CPF}</span>
                            </div>

                            <EditClientInput>
                                <h4>NOME: </h4>
                                <input
                                    name='NOME'
                                    value={editedClient.NOME}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                />
                            </EditClientInput>

                            <EditClientInput>
                                <h4>CONTATO: </h4>
                                <input
                                    name='CONTATO'
                                    value={editedClient.CONTATO}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                />
                            </EditClientInput>

                            {/* <EditClientInput>
                                <h4>DATA DE NASCIMENTO: </h4>
                                <input
                                    name='DATADENASCIMENTO'
                                    value={editedClient.DATADENASCIMENTO}
                                    disabled
                                    type='text'
                                />
                            </EditClientInput> */}

                            <h3>ENDEREÇO</h3>
                            <EditClientInput>
                                <h4>RUA: </h4>
                                <input
                                    name='ENDERECO.RUA'
                                    value={editedClient.ENDERECO?.RUA || ''}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                />
                            </EditClientInput>

                            <EditClientInput>
                                <h4>Nº: </h4>
                                <input
                                    name='ENDERECO.N'
                                    value={editedClient.ENDERECO?.N || ''}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='number'
                                />
                            </EditClientInput>

                            <EditClientInput>
                                <h4>BAIRRO: </h4>
                                <input
                                    name='ENDERECO.BAIRRO'
                                    value={editedClient.ENDERECO?.BAIRRO || ''}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                />
                            </EditClientInput>

                            <EditClientInput>
                                <h4>CEP: </h4>
                                <input
                                    name='ENDERECO.CEP'
                                    value={editedClient.ENDERECO?.CEP || ''}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                />
                            </EditClientInput>

                            <EditClientInput>
                                <h4>CIDADE: </h4>
                                <input
                                    name='ENDERECO.CIDADE'
                                    value={editedClient.ENDERECO?.CIDADE || ''}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                />
                            </EditClientInput>



                            <ButtonConfirmarEdicao onClick={handleSaveEdits}>CONFIRMAR</ButtonConfirmarEdicao>
                        </ModalBody>
                    </ModalContent>
                </ModalEdicao>
            )}
        </ClienteContainer>
    );
}
//modal de editar cliente
const ModalEdicao = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    // overflow: scroll;
    // padding: 20px 0;
    box-sizing: border-box; 
`;


const ModalContent = styled.div`
    background-color: #0b192f;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-height: 90%;
    overflow: scroll;
    box-sizing: border-box;
`;

const FecharModal = styled.p`
    margin: 0;
    width: 100%;
    text-align: end;
    margin-bottom: 20px;
    color: white;
    font-weight: 800;
`;

const ModalHeader = styled.h2`
    color: #90e0ef;
    margin-top: 0;
    text-align: center;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    p{
        color: #FFFF;
        text-align: center;
    }

    div{

        width: 100%;
        display: flex;
        flex-direction: column;

        h2{
            margin: 0;
            font-size: 18px;
            color: #ffff;
            display: flex;
            align-items: center;
            justify-content: space-between;

            p{
                margin: 0;
                font-size: 14px;
                color: red;
            }
        }

        span{
            margin: 0;
            font-size: 16px;
            color: #ffff;
            width: 100%;
            border-bottom: 1px solid white;
        }
    }

    h3{
        margin: 0;
        width: 100%;
        border-bottom: 2px solid #48cae4;
        color: #48cae4;
    }
`;

const ButtonConfirmarEdicao = styled.button`
    height: 40px;
    border: 0;
    font-weight: 800;
    color: rgba(0,0,0,0.6);
    background: linear-gradient(to right, #0096c7, #48cae4);
`;

const EditClientInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    h4{
        margin: 0;
        color: #ffff;
        font-size: 18px;
    }

    input{
        border: 0;
        box-sizing: border-box;
        padding-left: 10px;
        height: 30px;
        font-size: 16px;
        text-transform: uppercase;
    }
`;

//fim modal de editar cliente


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
    margin-top: 10px;
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
