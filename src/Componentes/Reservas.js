import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tabela1 from './Tabela1';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservas, selectAllReservas } from '../Redux/reducers/Reserva/ReservasSlice';
import { fetchClientes, selectAllClients } from '../Redux/reducers/Cliente/clientReducer';
import { useNavigate } from 'react-router-dom';

export default function Reservas({ onReservaSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMonth, setFilterMonth] = useState('ANO INTEIRO');
    const [confirmationFilter, setConfirmationFilter] = useState('TODAS'); // Estado para filtro de confirmação
    const dispatch = useDispatch();
    const reservas = useSelector(selectAllReservas);
    const clients = useSelector(selectAllClients);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchReservas());
        dispatch(fetchClientes());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMonthChange = (event) => {
        setFilterMonth(event.target.value);
    };

    const handleConfirmationChange = (event) => {
        setConfirmationFilter(event.target.value);
    };

    const handleClienteClick = (reserva) => {
        onReservaSelect(reserva);
        navigate(`/reserva`, { state: { reserva } });
    };

    const filterReservas = () => {
        // Combine reservas com informações de cliente associado
        const combinedData = reservas.map((reserva) => {
            const cliente = clients.find(client => client.CODC === reserva.CODC);
            return { ...reserva, cliente };
        });

        // Aplicar filtros e retornar os dados combinados
        return combinedData.filter((reserva) => {
            const searchLower = searchTerm.toLowerCase();
            const nomeMatch = reserva.cliente?.NOME.toLowerCase().includes(searchLower) ?? false;
            const cpfMatch = reserva.cliente?.CPF.includes(searchTerm) ?? false;
            const cidadeMatch = reserva.cliente?.ENDERECO.CIDADE.toLowerCase().includes(searchLower) ?? false;
            let monthMatch = true;

            if (filterMonth !== 'ANO INTEIRO') {
                const [day, month, year] = reserva.CHECKIN.split('/');
                const monthNames = [
                    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO",
                    "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
                ];
                monthMatch = monthNames[parseInt(month, 10) - 1] === filterMonth;
            }

            const confirmationMatch = confirmationFilter === 'TODAS' ||
                (confirmationFilter === 'CONFIRMADA' && reserva.CONFIRMACAO) ||
                (confirmationFilter === 'NAO_CONFIRMADA' && !reserva.CONFIRMACAO);

            return (nomeMatch || cpfMatch || cidadeMatch) && monthMatch && confirmationMatch;
        });
    };

    return (
        <ReservasContainer>
            <ComponentTitle>RESERVAS</ComponentTitle>
            <ReservasBox>
                <SearchArea>
                    <SearchInputMethod>
                        <span>PESQUISE (Nome, CPF ou Cidade)</span>
                        <input placeholder='...' value={searchTerm} onChange={handleSearchChange} />
                    </SearchInputMethod>
                    <SearchSelectMethod>
                        <span>PESQUISE PELO MÊS</span>
                        <select value={filterMonth} onChange={handleMonthChange}>
                            <option>ANO INTEIRO</option>
                            <option>JANEIRO</option>
                            <option>FEVEREIRO</option>
                            <option>MARÇO</option>
                            <option>ABRIL</option>
                            <option>MAIO</option>
                            <option>JUNHO</option>
                            <option>JULHO</option>
                            <option>AGOSTO</option>
                            <option>SETEMBRO</option>
                            <option>OUTUBRO</option>
                            <option>NOVEMBRO</option>
                            <option>DEZEMBRO</option>
                        </select>
                    </SearchSelectMethod>

                    <OutrosFiltros>
                        <span>FILTRE PELO PAGAMENTO</span>
                        <div>
                            <FiltroRadio>
                                <input
                                    type='radio'
                                    name='confirmationFilter'
                                    value='TODAS'
                                    checked={confirmationFilter === 'TODAS'}
                                    onChange={handleConfirmationChange}
                                />
                                <label>TODAS</label>
                            </FiltroRadio>
                            <FiltroRadio>
                                <input
                                    type='radio'
                                    name='confirmationFilter'
                                    value='CONFIRMADA'
                                    checked={confirmationFilter === 'CONFIRMADA'}
                                    onChange={handleConfirmationChange}
                                />
                                <label>RESERVADA</label>
                            </FiltroRadio>
                            <FiltroRadio>
                                <input
                                    type='radio'
                                    name='confirmationFilter'
                                    value='NAO_CONFIRMADA'
                                    checked={confirmationFilter === 'NAO_CONFIRMADA'}
                                    onChange={handleConfirmationChange}
                                />
                                <label>PRÉ RESERVADA</label>
                            </FiltroRadio>
                        </div>
                    </OutrosFiltros>
                </SearchArea>

                <Tabela1 reservas={filterReservas()} onReservaSelect={handleClienteClick} />
            </ReservasBox>

            
        </ReservasContainer>
    );
}

const OutrosFiltros = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: #ffff;
        font-weight: 600;
        margin: 0;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 5px;
    }
`;

const FiltroRadio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    label {
        margin: 0;
        color: #ffff;
        font-size: 14px;
        font-weight: 600;
    }

    input {
        margin: 0;
    }
`;

const ReservasContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(to right, #000814, #001D3D, #000814);
`;

const ComponentTitle = styled.h1`
    margin-top: 30px;
    color: #90e0ef;
`;

const ReservasBox = styled.div`
    width: 100%;
    margin-top: 40px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

const SearchInputMethod = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    gap: 5px;
    padding: 10px;

    span {
        color: #fff;
        font-weight: 600;
    }

    input {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        padding-left: 20px;
    }
`;

const SearchSelectMethod = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    gap: 5px;
    padding: 10px;

    span {
        color: #fff;
        font-weight: 600;
    }

    select {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        padding-left: 20px;
    }
`;
