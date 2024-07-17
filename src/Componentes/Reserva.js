import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteReserva, editReserva } from '../Redux/reducers/Reserva/ReservasSlice'; // Certifique-se de ajustar o caminho conforme necessário
import { setLoading } from '../Redux/reducers/Load/loadingSlice';
import { updateClienteHaverInfo } from '../UTILS/utils';

export default function Reserva({ reserva }) {
    const [chalesReserva, setChalesReserva] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const [editedReserva, setEditedReserva] = useState(reserva);
    const [modalEdicao, setModalEdicao] = useState(false);
    const [modalOpcoesPagamento, setModalOpcoesPagamento] = useState(false);
    const [modalHaver, setModalHaver] = useState(false);
    const [valoresPagamento, setValoresPagamento] = useState({
        VALORPAGO: reserva ? reserva.VALORPAGO : '',
        VALORTOTAL: reserva ? reserva.VALORTOTAL : ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (reserva) {
            setEditedReserva(reserva);
            setChalesReserva(reserva.CHALES);
        }
    }, [reserva]);

    const handleDelete = () => {
        if (confirmText === 'EXCLUIR') {
            dispatch(deleteReserva(reserva.id));
            setShowModal(false);
        }
    };

    const handleAtivarLoad = async () => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 2000);
    };

    const handleAtivarLoad2 = async () => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
            window.location.href = '/';
        }, 2000);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedReserva({ ...editedReserva, [name]: value });
    };

    const handleChaleChange = (e) => {
        const { name, checked } = e.target;
        setChalesReserva({ ...chalesReserva, [name]: checked });
    };

    const handleSaveEdits = () => {
        const updatedReserva = { ...editedReserva, CHALES: chalesReserva };
        dispatch(editReserva(updatedReserva));
        setModalEdicao(false);
        handleAtivarLoad();
    };

    const handleValoresPagamentoChange = (e) => {
        const { name, value } = e.target;
        setValoresPagamento({ ...valoresPagamento, [name]: value });
    };

    const handleSavePagamento = () => {
        const updatedReserva = {
            ...editedReserva,
            VALORPAGO: valoresPagamento.VALORPAGO,
            VALORTOTAL: valoresPagamento.VALORTOTAL,
            CONFIRMACAO: valoresPagamento.VALORPAGO !== reserva.VALORPAGO
        };
        dispatch(editReserva(updatedReserva));
        setModalOpcoesPagamento(false);
        handleAtivarLoad2();
    };

    function formatarTelefone(numero) {
        const digitsOnly = numero.replace(/\D/g, '');
        if (digitsOnly.length >= 10)
            return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
        return numero;
    }

    const handleMandarReservaPraHaver = () => {
        updateClienteHaverInfo(reserva.cliente.id, true , valoresPagamento.VALORPAGO);
        dispatch(deleteReserva(reserva.id));
        setModalOpcoesPagamento(false);
        handleAtivarLoad2();
    }

    if (!reserva) {
        return (
            <ReservaContainer>
                <ReservaNaoSelecionada><span>RESERVA NÃO SELECIONADA</span></ReservaNaoSelecionada>
            </ReservaContainer>
        );
    }

    return (
        <ReservaContainer>
            <ComponentTitle>RESERVA</ComponentTitle>

            <ReservaBox>
                <ReservaBoxTitle>DADOS DA RESERVA</ReservaBoxTitle>

                <ReservaDataBox>
                    <div>
                        <p>Nome: </p><span>{reserva && reserva.cliente.NOME}</span>
                    </div>
                    <div>
                        <p>Contato: </p><span>{reserva && formatarTelefone(reserva.cliente.CONTATO)}</span>
                    </div>
                    <div>
                        <p>Check-in: </p><span>{reserva && reserva.CHECKIN}</span>
                    </div>
                    <div>
                        <p>Check-out: </p><span>{reserva && reserva.CHECKOUT}</span>
                    </div>
                    <div>
                        <p>Pessoas: </p><span>{reserva && reserva.QUANTIDADEPESSOAS}</span>
                    </div>
                    <div>
                        <p>Chalés: </p><span>{reserva && Object.keys(chalesReserva).filter(chale => chalesReserva[chale]).join(', ')}</span>
                    </div>
                    <div>
                        <p>Reserva Confirmada: </p><span>{reserva && reserva.CONFIRMACAO ? 'SIM' : 'NÃO'}</span>
                    </div>
                    <div>
                        <p>Valor já pago: </p><span>R$ {reserva && reserva.VALORPAGO}</span>
                    </div>
                    <div>
                        <p>Valor Total: </p><span>R$ {reserva && reserva.VALORTOTAL}</span>
                    </div>
                </ReservaDataBox>
            </ReservaBox>

            <MenuOptions>
                <div>
                    <button className='cancelarBtn' onClick={openModal}>CANCELAR RESERVA</button>
                    <button className='editarBtn' onClick={() => setModalEdicao(true)}>EDITAR RESERVA</button>
                </div>
                <div className='opcoesPagamento'>
                    <button className='optionAboutPaymentBtn' onClick={() => setModalOpcoesPagamento(true)}>OPÇÕES SOBRE PAGAMENTO</button>
                    <button className='cancelarEManterHaverBtn' onClick={() => setModalHaver(true)}>CANCELAR => HAVER</button>
                </div>
            </MenuOptions>

            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Confirmar Exclusão</ModalHeader>
                        <ModalBody>
                            <p>Digite "EXCLUIR" para confirmar a exclusão da reserva:</p>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={closeModal}>Cancelar</button>
                            <button onClick={handleDelete} disabled={confirmText !== 'EXCLUIR'}>Confirmar</button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}

            {modalEdicao && (
                <ModalEdicaoOverlay>
                    <ModalEdicaoContent>
                        <FecharModal onClick={() => setModalEdicao(false)}>X</FecharModal>
                        <ModalHeader>EDITAR INFORMAÇÕES</ModalHeader>
                        <ModalBody>
                            <EditReservaInput>
                                <h4>NOME: </h4>
                                <input
                                    name='cliente.NOME'
                                    value={editedReserva.cliente.NOME}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='text'
                                    disabled
                                />
                            </EditReservaInput>

                            <EditReservaInput>
                                <h4>CONTATO: </h4>
                                <input
                                    name='cliente.CONTATO'
                                    value={formatarTelefone(editedReserva.cliente.CONTATO)}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    disabled
                                    type='text'
                                />
                            </EditReservaInput>

                            <EditReservaInput>
                                <h4>CHECK-IN: </h4>
                                <input
                                    name='CHECKIN'
                                    value={editedReserva.CHECKIN}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    disabled
                                    type='text'
                                />
                            </EditReservaInput>

                            <EditReservaInput>
                                <h4>CHECK-OUT: </h4>
                                <input
                                    name='CHECKOUT'
                                    value={editedReserva.CHECKOUT}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    disabled
                                    type='text'
                                />
                            </EditReservaInput>

                            <EditReservaInput>
                                <h4>PESSOAS: </h4>
                                <input
                                    name='QUANTIDADEPESSOAS'
                                    value={editedReserva.QUANTIDADEPESSOAS}
                                    onChange={handleInputChange}
                                    placeholder='...'
                                    type='number'
                                />
                            </EditReservaInput>

                            <EditReservaInput>
                                <h4>CHALÉS: </h4>
                                {Object.keys(chalesReserva).map((chale) => (
                                    <div key={chale}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name={chale}
                                                checked={chalesReserva[chale]}
                                                onChange={handleChaleChange}
                                            />
                                            {chale}
                                        </label>
                                    </div>
                                ))}
                            </EditReservaInput>

                            <BotoesModalEdicao>
                                <ButtonCancelarEdicao onClick={() => setModalEdicao(false)}>CANCELAR</ButtonCancelarEdicao>
                                <ButtonConfirmarEdicao onClick={handleSaveEdits}>CONFIRMAR</ButtonConfirmarEdicao>

                            </BotoesModalEdicao>
                        </ModalBody>
                    </ModalEdicaoContent>
                </ModalEdicaoOverlay>
            )}


            {modalOpcoesPagamento && (
                <ModalEdicaoOverlay>
                    <ModalOpcoesPagamentoContent>
                        <h1>OPÇÕES DE PAGAMENTO</h1>

                        <div>
                            <OpcaoPagamentoEdit>
                                <span>VALOR JÁ PAGO</span>
                                <input
                                    type="number"
                                    name="VALORPAGO"
                                    value={valoresPagamento.VALORPAGO}
                                    onChange={handleValoresPagamentoChange}
                                />
                            </OpcaoPagamentoEdit>

                            <OpcaoPagamentoEdit>
                                <span>VALOR TOTAL</span>
                                <input
                                    type="number"
                                    name="VALORTOTAL"
                                    value={valoresPagamento.VALORTOTAL}
                                    onChange={handleValoresPagamentoChange}
                                />
                            </OpcaoPagamentoEdit>
                        </div>

                        <ConfirmacaoButtons>
                            <button className='cancelar' onClick={() => setModalOpcoesPagamento(false)}>Cancelar</button>
                            <button className='salvar' onClick={handleSavePagamento}>Salvar</button>
                        </ConfirmacaoButtons>
                    </ModalOpcoesPagamentoContent>
                </ModalEdicaoOverlay>
            )}

            {modalHaver && (
                <ModalEdicaoOverlay>
                    <ModalHaverContent>

                        <p>DESEJA REALMENTE CANCELAR A RESERVA DO CLIENTE <span>{reserva.cliente.NOME}</span>, da data <span>{reserva.CHECKIN}</span> até <span>{reserva.CHECKOUT}</span></p>

                        <p>O VALOR DE <span>R${reserva.VALORPAGO}</span> será salvo como saldo em haver para o cliente, poderá ser visto na aba de <span>HAVERES</span></p>

                        <div>
                            <button onClick={() => setModalHaver(false)} className='cancelarBtn'>NÃO, CANCELAR</button>
                            <button onClick={handleMandarReservaPraHaver} className='confirmarBtn'>SIM, CONFIRMAR</button>
                        </div>
                    </ModalHaverContent>
                </ModalEdicaoOverlay>
            )}
        </ReservaContainer>
    );
}

const ModalHaverContent = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: linear-gradient(to right, #001D3D, #003566);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;

    p{
        text-align: justify;
        color: #ffff;
        font-weight: 600;

        span{
            color: #ef476f;
        }
    }

    div{
        width: 100%;
        display: flex;
        gap: 20px;

        button{
            width: 100%;
            height: 40px;
            font-weight: 800;
            color: #ffff;
        }

        .cancelarBtn{
            background-color: red;
        }

        .confirmarBtn{
            background-color: green;
        }
    }
`;

const BotoesModalEdicao = styled.div`
    margin-top: 20px;
    width: 100%;
    justify-content: center;
    gap: 20px;
`;

const ModalOpcoesPagamentoContent = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: linear-gradient(to right, #001D3D, #003566);

    h1{
        text-align: center;
        color: #00b4d8;
    }

    div{
        displaY: flex;
        flex-direction: column;
        gap: 0;
        padding: 20px;
    }
`;

const OpcaoPagamentoEdit = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;

    span{
        color: #ffff;
        font-weight: 600;
    }

    input{
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        padding-left: 20px;
        font-size: 22px;
    }

`;

const ConfirmacaoButtons = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;

    button{
        margin-top: 10px;
        width: 100%;
        height: 40px;
    }

    .cancelar{
        background: red;
    }

    .salvar{
        background: green;
    }
`;

const ReservaContainer = styled.div`
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

const ReservaNaoSelecionada = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content:center;

    span{
        color: red;
    }
`;

const ReservaBox = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  box-sizing: border-box;
  padding: 20px 30px;
  align-items: center;
  flex-direction: column;
`;

const ReservaBoxTitle = styled.h5`
  margin: 0;
  color: #ffff;
  font-size: 18px;
  width: 100%;
  text-align: center;
  border-bottom: 2px solid #ffff;
`;

const ReservaDataBox = styled.div`
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
      color: #90e0ef;
    }

    span {
      color: #fff;
    }
  }
`;

const MenuOptions = styled.div`
    margin-top: 20px;
    width: 100%;

    div{
        width: 100%;
        display: flex;
        gap: 20px;
        padding: 0 20px;
        box-sizing: border-box;

        .cancelarBtn {
            color: #fff;
            background: red;
            border: none;
            height: 40px;
            cursor: pointer;
            width: 100%;
        }

        .editarBtn {
            color: #fff;
            background: blue;
            border: none;
            height: 40px;
            width: 100%;
            cursor: pointer;
        }
    }

    .opcoesPagamento{
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        button{
            width: 100%;
            height: 40px;
            font-weight: 800;
        }

        .optionAboutPaymentBtn{
            color: #ffff;
            background-color: green;
        }

        .cancelarEManterHaverBtn{
            color: #00000;
            margin-top: -15px;
            background-color: yellow;
        }
    }
  
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.h2`
  margin: 0;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  button:nth-child(2) {
    background: red;
    color: #fff;
  }
`;

const ModalEdicaoOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 9999;
  align-items: center;
`;

const ModalEdicaoContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FecharModal = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const EditReservaInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h4 {
    margin: 0;
  }

  input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const ButtonConfirmarEdicao = styled.button`
  background: blue;
  color: #fff;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  width: 100%;
  height: 40px;
  border-radius: 4px;
`;

const ButtonCancelarEdicao = styled.button`
  background: red;
  color: #fff;
  border: none;
  width: 100%;
  height: 40px;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 4px;
  margin-bottom: 10px;
`;