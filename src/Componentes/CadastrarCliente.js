import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { cadastrarCliente, resetCadastroStatus } from '../Redux/reducers/Cliente/cadastroSlice';

export default function CadastrarCliente() {
    const dispatch = useDispatch();
    const cadastroStatus = useSelector(state => state.cadastro.status);
    const cadastroError = useSelector(state => state.cadastro.error);

    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState({ rua: '', numero: '', bairro: '', cep: '', cidade: '' });
    const [dataDeNascimento, setDataDeNascimento] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const novoCliente = {
            NOME: nome,
            CONTATO: contato,
            CPF: cpf,
            DATADENASCIMENTO: dataDeNascimento,
            ENDERECO: {
                RUA: endereco.rua,
                BAIRRO: endereco.bairro,
                N: endereco.numero,
                CEP: endereco.cep,
                CIDADE: endereco.cidade
            }
        };

        try {
            dispatch(cadastrarCliente(novoCliente));
            // Limpar o formulário após o cadastro, se necessário
            clearForm();
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            // Tratar o erro, se necessário
        }
    };

    const clearForm = () => {
        setNome('');
        setContato('');
        setCpf('');
        setEndereco({ rua: '', numero: '', bairro: '', cep: '', cidade: '' });
        setDataDeNascimento('');
    };

    return (
        <CadastroContainer>
            <ComponentTitle>CADASTRAR NOVO CLIENTE</ComponentTitle>
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nome Completo:</Label>
                    <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label>Contato:</Label>
                    <Input type="text" value={contato} onChange={(e) => setContato(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label>CPF:</Label>
                    <Input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label>Endereço:</Label>
                    <Input type="text" placeholder="Rua" value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} required />
                    <Input type="text" placeholder="Número" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} required />
                    <Input type="text" placeholder="Bairro" value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} required />
                    <Input type="text" placeholder="CEP" value={endereco.cep} onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })} required />
                    <Input type="text" placeholder="Cidade" value={endereco.cidade} onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                    <Label>Data de Nascimento:</Label>
                    <Input type="date" value={dataDeNascimento} onChange={(e) => setDataDeNascimento(e.target.value)} required />
                </FormGroup>
                <Button type="submit">CADASTRAR</Button>
                {cadastroStatus === 'loading' && <StatusMessage>Carregando...</StatusMessage>}
                {cadastroStatus === 'failed' && <StatusMessage error>{cadastroError}</StatusMessage>}
                {cadastroStatus === 'succeeded' && <StatusMessage success="true">Cadastro realizado com sucesso!</StatusMessage>}
            </FormContainer>
        </CadastroContainer>
    );
}

const CadastroContainer = styled.div`
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
    text-align: center;
`;

const FormContainer = styled.form`
    width: 90%;
    max-width: 600px;
    margin-top: 40px;
    box-sizing: border-box;
    padding: 20px;
    background-color: #0b192f;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.label`
    color: #ade8f4;
    font-weight: 600;
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
    background-color: #90e0ef;
    color: #0b192f;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #6fc6d3;
    }
`;

const StatusMessage = styled.p`
    margin: 0;
    padding: 10px;
    border-radius: 4px;
    background-color: ${({ error, success }) => (error ? '#ffcccc' : (success ? '#ccffcc' : '#f0f0f0'))};
    color: ${({ error, success }) => (error ? '#ff3333' : (success ? '#33cc33' : '#333333'))};
    font-weight: bold;
`;
