import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientes, selectAllClients } from '../Redux/reducers/Cliente/clientReducer';
import TabelaClientes from './TabelaClientes';
import { useNavigate } from 'react-router-dom'; 

export default function Clientes({ onClienteSelect }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const clients = useSelector(selectAllClients);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterClientes = () => {
    return clients.filter((cliente) => {
      const searchLower = searchTerm.toLowerCase();
      const nomeMatch = cliente.NOME.toLowerCase().includes(searchLower);
      const cpfMatch = cliente.CPF.includes(searchTerm);
      const cidadeMatch = cliente.ENDERECO.CIDADE.toLowerCase().includes(searchLower);

      return nomeMatch || cpfMatch || cidadeMatch;
    });
  };

  const handleClienteClick = (cliente) => {
    onClienteSelect(cliente);
    navigate(`/cliente`, { state: { cliente } }); 
  };

  return (
    <ClientesContainer>
      <ComponentTitle>CLIENTES</ComponentTitle>
      <ClientesBox>
        <SearchArea>
          <SearchInputMethod>
            <span>PESQUISE (Nome, Cpf ou Cidade)</span>
            <input placeholder='...' value={searchTerm} onChange={handleSearchChange} />
          </SearchInputMethod>
        </SearchArea>
        <TabelaClientes clientes={filterClientes()} onClienteSelect={handleClienteClick} />
      </ClientesBox>
    </ClientesContainer>
  );
}

const ClientesContainer = styled.div`
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

const ClientesBox = styled.div`
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
    color: #ffff;
    font-weight: 600;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding-left: 20px;
  }
`;
