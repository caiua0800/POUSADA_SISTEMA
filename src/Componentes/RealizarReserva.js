import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientes, selectAllClients } from '../Redux/reducers/Cliente/clientReducer';
import { FazerReserva } from '../Redux/reducers/Reserva/reservarSlice';
import { fetchReservas, selectAllReservas } from '../Redux/reducers/Reserva/ReservasSlice';
import { setLoading } from '../Redux/reducers/Load/loadingSlice';
import { editCliente } from '../Redux/reducers/Cliente/clientReducer';


export default function RealizarReserva() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [contato, setContato] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [quantidadePessoas, setQuantidadePessoas] = useState('');
    const [apartamentosUsados, setApartamentosUsados] = useState({
        mayra: false,
        gilmar: false,
        caiua: false,
        trancoso: false,
        nathalia: false,
        master: false
    });
    const [reservaConfirmada, setReservaConfirmada] = useState(false);
    const [valorJaPago, setValorJaPago] = useState('0');
    const [valorTotal, setValorTotal] = useState('');
    const [CODC, setCODC] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null); 
    const [valorEmHaverDoCliente, setValorEmHaverDoCliente] = useState('');
    const [valorEmHaverDoCliente2, setValorEmHaverDoCliente2] = useState('');

    const dispatch = useDispatch();
    const clients = useSelector(selectAllClients);

    const handleAtivarLoad = async () => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
            window.location.href = '/';
        }, 2000);
    };

    useEffect(() => {
        dispatch(fetchClientes());
    }, [dispatch]);

    const handleApartamentoChange = (apartamento) => {
        setApartamentosUsados({
            ...apartamentosUsados,
            [apartamento]: !apartamentosUsados[apartamento]
        });
    };

    const handleClientSelection = (clientName, codc, contato, clientObj) => {
        setNomeCompleto(clientName);
        setCODC(codc)
        setContato(contato);
        setClientListOpen(false);

        if(clientObj.CONTEMHAVER){
            setValorEmHaverDoCliente('Esse cliente contém haver de R$' + clientObj.HAVERVALOR);
            setValorEmHaverDoCliente2('R$' + clientObj.HAVERVALOR + " de haver adicionados");
            alert('Esse cliente contém haver de R$' + clientObj.HAVERVALOR);

            setReservaConfirmada(true);
            setValorJaPago(clientObj.HAVERVALOR);
        }

    };


    const handleInputChange = (e) => {
        const { value } = e.target;
        setNomeCompleto(value);
        setClientListOpen(value.trim().length > 0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Formatar a data de check-in e check-out para o formato brasileiro
        const formattedCheckin = formatarData(checkin);
        const formattedCheckout = formatarData(checkout);

        // Montar o objeto novaReserva com os dados formatados
        const novaReserva = {
            CODC,
            CHECKIN: formattedCheckin,
            CHECKOUT: formattedCheckout,
            QUANTIDADEPESSOAS: quantidadePessoas,
            CHALES: {
                CAIUA: apartamentosUsados.caiua,
                MAYRA: apartamentosUsados.mayra,
                MASTER: apartamentosUsados.master,
                TRANCOSO: apartamentosUsados.trancoso,
                GILMAR: apartamentosUsados.gilmar,
                NATHALIA: apartamentosUsados.nathalia,
            },
            CONFIRMACAO: reservaConfirmada,
            VALORPAGO: valorJaPago,
            VALORTOTAL: valorTotal,
        };

        dispatch(FazerReserva(novaReserva))
            .then(() => {
                // Atualizar o campo CONTEMHAVER e HAVERVALOR do cliente
                if (clients) {
                    const selectedClient = clients.find(client => client.CODC === CODC);
                    if (selectedClient) {
                        dispatch(editCliente({
                            id: selectedClient.id,
                            CONTEMHAVER: false,
                            HAVERVALOR: ""
                        }));
                    }
                }

                // Limpar os campos após submissão (opcional)
                clearFields();
                setSubmitStatus('success'); // Define o status de sucesso
                handleAtivarLoad();
            })
            .catch((error) => {
                console.error('Erro ao fazer reserva:', error.message);
                setSubmitStatus('error'); // Define o status de erro
            });
    };

    function formatarTelefone(numero) {
        const digitsOnly = numero.replace(/\D/g, '');
        if (digitsOnly.length >= 10)
            return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
        return numero;
    }

    function formatarData(dataString) {
        // Verifica se a string está no formato esperado
        if (!dataString || typeof dataString !== 'string' || dataString.length !== 10 || dataString[4] !== '-' || dataString[7] !== '-') {
            throw new Error('Formato de data inválido. Deve ser YYYY-MM-DD.');
        }

        // Separa a string pelos hífens
        const partes = dataString.split('-');

        // Monta a data no formato desejado
        const dia = partes[2];
        const mes = partes[1];
        const ano = partes[0];

        return `${dia}/${mes}/${ano}`;
    }

    const handleValorJaPagoChange = (e) => {
        let valor = e.target.value;
    
        // Se o valor estiver vazio, define como '0'
        if (valor.trim() === '') {
            setReservaConfirmada(false);
        }
    
        // Verifica se o valor é um número válido
        const valorNumerico = parseFloat(valor);
    
        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            setReservaConfirmada(true);
        } else {
            setReservaConfirmada(false);
        }
        setValorJaPago(valor);
    }
    
    

    const clearFields = () => {
        setNomeCompleto('');
        setContato('');
        setCheckin('');
        setCheckout('');
        setValorTotal('');

        setQuantidadePessoas('');
        setApartamentosUsados({
            mayra: false,
            gilmar: false,
            caiua: false,
            trancoso: false,
            nathalia: false,
            master: false
        });
        setReservaConfirmada(false);
        setValorJaPago('');
    };

    const [clientListOpen, setClientListOpen] = useState(false);

    const filteredClients = clients.filter(client => client.NOME.toLowerCase().includes(nomeCompleto.toLowerCase()));

    return (
        <ReservaContainer>
            <ComponentTitle>REALIZAR RESERVA</ComponentTitle>

            <ReservaForm onSubmit={handleSubmit}>
                <InputLabel>
                    Nome Completo:
                    <input
                        type="text"
                        value={nomeCompleto}
                        onChange={handleInputChange}
                        required
                    />
                    {clientListOpen && (
                        <ClientList>
                            {filteredClients.map(client => (
                                <ClientItem key={client.id} onClick={() => handleClientSelection(client.NOME, client.CODC, client.CONTATO, client)}>
                                    {client.NOME}
                                </ClientItem>
                            ))}
                        </ClientList>
                    )}
                </InputLabel>
                <span className='haverDoCliente'>{valorEmHaverDoCliente}</span>
                <InputLabel>
                    Contato:
                    <input
                        type="text"
                        value={formatarTelefone(contato)}
                        onChange={(e) => setContato(e.target.value)}
                    />
                </InputLabel>
                <InputLabel>
                    Check-in:
                    <input
                        type="date"
                        value={checkin}
                        onChange={(e) => setCheckin(e.target.value)}
                        required
                    />
                </InputLabel>
                <InputLabel>
                    Check-out:
                    <input
                        type="date"
                        value={checkout}
                        onChange={(e) => setCheckout(e.target.value)}
                        required
                    />
                </InputLabel>
                <InputLabel>
                    Quantidade de Pessoas:
                    <input
                        type="number"
                        value={quantidadePessoas}
                        onChange={(e) => setQuantidadePessoas(e.target.value)}
                        required
                    />
                </InputLabel>
                <ApartamentosLabel>
                    Apartamentos Usados:
                    <ApartamentosCheckbox>
                        <label>
                            Mayra
                            <input
                                type="checkbox"
                                checked={apartamentosUsados.mayra}
                                onChange={() => handleApartamentoChange('mayra')}
                            />
                        </label>
                        <label>
                            Gilmar
                            <input
                                type="checkbox"
                                checked={apartamentosUsados.gilmar}
                                onChange={() => handleApartamentoChange('gilmar')}
                            />
                        </label>
                        <label>
                            Caiua
                            <input
                                type="checkbox"
                                checked={apartamentosUsados.caiua}
                                onChange={() => handleApartamentoChange('caiua')}
                            />
                        </label>
                        <label>
                            Trancoso
                            <input
                                type="checkbox"
                                checked={apartamentosUsados.trancoso}
                                onChange={() => handleApartamentoChange('trancoso')}
                            />
                        </label>
                        <label>
                            Nathalia
                            <input
                                type="checkbox"
                                checked={apartamentosUsados.nathalia}
                                onChange={() => handleApartamentoChange('nathalia')}
                            />
                        </label>
                        <label>
                            Master
                            <input
                                type="checkbox"
                                checked={apartamentosUsados.master}
                                onChange={() => handleApartamentoChange('master')}
                            />
                        </label>
                    </ApartamentosCheckbox>
                </ApartamentosLabel>
                <InputLabel>
                    Valor já Pago:
                    <input
                        type="text"
                        value={valorJaPago}
                        onChange={(e) => handleValorJaPagoChange(e)}
                        required
                    />
                    <InformeValorHaver>{valorEmHaverDoCliente2}</InformeValorHaver>
                </InputLabel>
                <InputLabel>
                    Valor Total:
                    <input
                        type="text"
                        value={valorTotal}
                        onChange={(e) => setValorTotal(e.target.value)}
                        required
                    />
                </InputLabel>
                <SubmitButton type="submit">Realizar Reserva</SubmitButton>
            </ReservaForm>
            {submitStatus === 'success' && (
                <SuccessMessage>Reserva realizada com sucesso!</SuccessMessage>
            )}
            {submitStatus === 'error' && (
                <ErrorMessage>Ocorreu um erro ao fazer a reserva. Por favor, tente novamente.</ErrorMessage>
            )}
        </ReservaContainer>
    );
}


const InformeValorHaver = styled.span`
    color: red;
    text-align: center;
`;

const ReservaContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 30px;
    background: linear-gradient(to right, #000814, #001D3D, #000814);
`;

const ComponentTitle = styled.h1`
    margin-top: 60px;
    color: #90e0ef;
`;

const ReservaForm = styled.form`
    width: 80%;
    padding: 20px;
    background-color: #0b1933;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .haverDoCliente{
        color: red;
    }
`;

const InputLabel = styled.label`
    color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    font-weight: 600;
    margin-bottom: 5px;
    box-sizing: border-box;

    input {
        height: 30px;
        box-sizing: border-box;
    }

    .exceptionInput {
        height: 20px;
    }

    .exceptionLabelInput {
        background-color: black;
    }
`;

const ClientList = styled.ul`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    z-index: 10;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-height: 150px;
    overflow-y: auto;
    padding: 5px 0;
    box-sizing: border-box;
`;

const ClientItem = styled.li`
    cursor: pointer;
    padding: 5px;
    list-style-type: none;
    transition: background-color 0.3s ease;
    color: black;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const ApartamentosLabel = styled.label`
    color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 600;
    margin-bottom: 5px;
    justify-content: center;
`;

const ApartamentosCheckbox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 5px;
    justify-content: center;

    label {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #ffffff;
    }
`;

const SubmitButton = styled.button`
    width: 50%;
    margin-top: 20px;
    padding: 10px;
    background-color: #90e0ef;
    color: #0b1933;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ade8f4;
    }
`;

const SuccessMessage = styled.p`
    color: green;
    font-weight: bold;
    margin-top: 10px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
    margin-top: 10px;
`;
