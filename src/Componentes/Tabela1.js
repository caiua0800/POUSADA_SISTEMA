// Tabela1.js
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
    cursor: pointer; // Adicione cursor pointer para indicar interatividade
  }
`;

const Tabela1 = ({ reservas, onReservaSelect }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Check-in</Th>
          <Th>Check-out</Th>
        </Tr>
      </thead>
      <tbody>
        {reservas.map((reserva, index) => (
          <Tr key={index} onClick={() => onReservaSelect(reserva)}>
            <Td>{reserva.cliente.NOME}</Td>
            <Td>{reserva.CHECKIN}</Td>
            <Td>{reserva.CHECKOUT}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tabela1;
