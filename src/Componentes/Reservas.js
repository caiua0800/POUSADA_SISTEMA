import React, { useState } from 'react';
import styled from 'styled-components';
import Tabela1 from './Tabela1';
import reservas from '../data/ReservasTest';

export default function Reservas() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMonth, setFilterMonth] = useState('ANO INTEIRO');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMonthChange = (event) => {
        setFilterMonth(event.target.value);
    };

    const filterReservas = () => {
        return reservas.filter((reserva) => {
            const searchLower = searchTerm.toLowerCase();
            const nomeMatch = reserva.nomeCompleto.toLowerCase().includes(searchLower);
            // Adicione aqui a lógica de CPF ou Cidade se for necessário
            let monthMatch = true;

            if (filterMonth !== 'ANO INTEIRO') {
                const [day, month, year] = reserva.checkin.split('/');
                const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
                monthMatch = monthNames[parseInt(month, 10) - 1] === filterMonth;
            }

            return nomeMatch && monthMatch;
        });
    };

    return (
        <ReservasContainer>
            <ComponentTitle>RESERVAS</ComponentTitle>
            <ReservasBox>

                <SearchArea>
                    <SearchInputMethod>
                        <span>PESQUISE (Nome, Cpf ou Cidade)</span>
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
                </SearchArea>

                <Tabela1 reservas={filterReservas()} />
            </ReservasBox>
        </ReservasContainer>
    )
}

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

    span{
        color: #ffff;
        font-weight: 600;
    }

    input{
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

    span{
        color: #ffff;
        font-weight: 600;
    }

    select{
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        padding-left: 20px;
    }
`;
