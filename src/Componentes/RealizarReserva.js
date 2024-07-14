import React, { useState } from 'react';
import styled from 'styled-components';

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
    const [valorJaPago, setValorJaPago] = useState('');

    const handleApartamentoChange = (apartamento) => {
        setApartamentosUsados({
            ...apartamentosUsados,
            [apartamento]: !apartamentosUsados[apartamento]
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode implementar a lógica para salvar a reserva
        console.log({
            nomeCompleto,
            contato,
            checkin,
            checkout,
            quantidadePessoas,
            apartamentosUsados,
            reservaConfirmada,
            valorJaPago
        });
        // Limpar os campos após submissão (opcional)
        clearFields();
    };

    const clearFields = () => {
        setNomeCompleto('');
        setContato('');
        setCheckin('');
        setCheckout('');
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

    return (
        <ReservaContainer>
            <ComponentTitle>REALIZAR RESERVA</ComponentTitle>
            <ReservaForm onSubmit={handleSubmit}>
                <InputLabel>
                    Nome Completo:
                    <input
                        type="text"
                        value={nomeCompleto}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                        required
                    />
                </InputLabel>
                <InputLabel>
                    Contato:
                    <input
                        type="text"
                        value={contato}
                        onChange={(e) => setContato(e.target.value)}
                        required
                    />
                </InputLabel>
                <InputLabel>
                    Check-in:
                    <input
                        type="text"
                        value={checkin}
                        onChange={(e) => setCheckin(e.target.value)}
                        required
                    />
                </InputLabel>
                <InputLabel>
                    Check-out:
                    <input
                        type="text"
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
                <InputLabel className='exceptionLabelInput'>
                    Reserva Confirmada:
                    <input className='exceptionInput'
                        type="checkbox"
                        checked={reservaConfirmada}
                        onChange={() => setReservaConfirmada(!reservaConfirmada)}
                    />
                </InputLabel>
                <InputLabel>
                    Valor já Pago:
                    <input
                        type="text"
                        value={valorJaPago}
                        onChange={(e) => setValorJaPago(e.target.value)}
                        required
                    />
                </InputLabel>
                <SubmitButton type="submit">Realizar Reserva</SubmitButton>
            </ReservaForm>
        </ReservaContainer>
    );
}

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
`;

const InputLabel = styled.label`
    color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 600;
    margin-bottom: 5px;
    box-sizing: border-box;
    
    input{
        height: 30px;    
        box-sizing: border-box;
    }

    .exceptionInput{
        height: 20px;    
    
    }

    .exceptionLabelInput{
        background-color: black;
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
