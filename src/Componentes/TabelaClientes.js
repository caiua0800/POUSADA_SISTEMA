import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #001D3D;
  border: 2px solid #ffff;
  padding: 8px;
  color: #48cae4;
`;

const Td = styled.td`
  border: 2px solid #ffff;
  padding: 8px;
  font-weight: 600;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #00b4d8;
  }
  background-color: #0096c7;

  &:hover {
    background-color: #ffff;
    cursor: pointer;
  }
`;

const TabelaClientes = ({ clientes, onClienteSelect }) => {
  const handleClienteClick = (cliente) => {
    onClienteSelect(cliente);
  };

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Contato</Th>
        </Tr>
      </thead>
      <tbody>
        {clientes.map((cliente, index) => (
          <Tr key={index} onClick={() => handleClienteClick(cliente)}>
            <Td>{cliente.NOME}</Td>
            <Td>{cliente.CONTATO}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TabelaClientes;
