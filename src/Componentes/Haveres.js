import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientes, selectAllClients } from '../Redux/reducers/Cliente/clientReducer';
import TabelaClientes from './TabelaClientes';
import { useNavigate } from 'react-router-dom';

export default function Haveres({ onClienteSelect }) {
    const dispatch = useDispatch();
    const clients = useSelector(selectAllClients);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchClientes());
    }, [dispatch]);

    const handleClienteClick = (cliente) => {
        onClienteSelect(cliente);
        navigate(`/cliente`, { state: { cliente } });
    };

    const filterClientes = () => {
        return clients.filter(cliente => cliente.CONTEMHAVER)
      };

    return (

        <HaveresContainer>
            <ComponentTitle>HAVERES</ComponentTitle>
            <TabelaClientes clientes={filterClientes()} onClienteSelect={handleClienteClick} />
        </HaveresContainer>
    )
}

const HaveresContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to right, #000814, #001D3D, #000814);
  padding: 0 20px;
  box-sizing: border-box;
`;

const ComponentTitle = styled.h1`
  margin-top: 30px;
  color: #90e0ef;
`;