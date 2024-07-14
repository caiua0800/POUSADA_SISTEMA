// Modal.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div`
    background-color: #0b192f;
    border-radius: 8px;
    padding: 20px;
    max-width: 80%;
    width: 400px;
    box-sizing: border-box;
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
`;

const Input = styled.input`
    height: 30px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
`;

const Button = styled.button`
    height: 40px;
    background-color: ${({ confirm }) => (confirm ? '#6fc6d3' : '#850a0a')};
    color: ${({ confirm }) => (confirm ? '#0b192f' : '#fff')};
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ confirm }) => (confirm ? '#5ab8c3' : '#6c0707')};
    }
`;

const Modal = ({ onClose, onConfirm }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleConfirm = () => {
        if (inputValue === 'EXCLUIR') {
            onConfirm();
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>Confirmação</ModalHeader>
                <ModalBody>
                    <p>Para excluir, digite <strong>EXCLUIR</strong> em maiúsculas:</p>
                    <Input type="text" value={inputValue} onChange={handleInputChange} />
                    <Button onClick={handleConfirm} confirm>Confirmar Exclusão</Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;
