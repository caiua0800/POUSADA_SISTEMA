import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Reserva({ reserva }) {

    const [chalesReserva, setChalesReserva] = useState('');

    useEffect(() => {
        verificarChalesUtilizados();
    }, [reserva]);

    const verificarChalesUtilizados = () => {
        const chalesUtilizados = Object.keys(reserva.apartamentosUsados).filter(chale => reserva.apartamentosUsados[chale]);
        setChalesReserva(chalesUtilizados.join(', '));
    };


    return (

        <ReservaContainer>
            <ComponentTitle>RESERVA</ComponentTitle>
            <ReservaData>{reserva.checkin} - {reserva.checkout}</ReservaData>

            <ReservaBox>
                <ReservaBoxTitle>DADOS DA RESERVA</ReservaBoxTitle>

                <ReservaDataBox>
                    <div>
                        <p>Nome: </p><span>{reserva.nomeCompleto}</span>
                    </div>
                    <div>
                        <p>Contato: </p><span>{reserva.contato}</span>
                    </div>
                    <div>
                        <p>Check-in: </p><span>{reserva.checkin}</span>
                    </div>
                    <div>
                        <p>Check-out: </p><span>{reserva.checkout}</span>
                    </div>
                    <div>
                        <p>Pessoas: </p><span>{reserva.quantidadePessoas}</span>
                    </div>
                    <div>
                        <p>Chalés: </p><span>{chalesReserva}</span>
                    </div>
                    <div>
                        <p>Reserva Confirmada: </p><span>{reserva.reservaConfirmada ? 'SIM' : 'NÃO'}</span>
                    </div>
                    <div>
                        <p>Valor já pago: </p><span>R$ {reserva.valorJaPago}</span>
                    </div>
                </ReservaDataBox>
            </ReservaBox>

            <MenuOptions>
                <button className='cancelarBtn'>CANCELAR RESERVA</button>
                <button className='editarBtn'>EDITAR RESERVA</button>
            </MenuOptions>
        </ReservaContainer>
    )
}

const ReservaContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;

    background: linear-gradient(to right, #000814, #001D3D, #000814);
`;

const ComponentTitle = styled.h1`
    margin: 0;
    margin-top: 30px;
    color: #90e0ef;
`;

const ReservaData = styled.h4`
    margin: 0;
    color: #ade8f4;
`;

const ReservaBox = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    box-sizing: border-box;
    padding: 20px 30px;
    align-items: center;
    flex-direction: column;
`;

const ReservaBoxTitle = styled.h5`
    margin: 0;
    color: #ffff;
    font-size: 18px;
    width: 100%;
    text-align: center;
    border-bottom: 2px solid #ffff;
`;

const ReservaDataBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    div{
        width: 100%;
        display: flex;
        gap: 5px;

        p{
            margin: 0;
            color: #ffff;
            font-weight: 600;
        }

        span{
            margin: 0;
            color: rgba(255, 255, 255, 0.6);
        }
    }
`;

const MenuOptions = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    gap: 10px;

    button{
        height: 40px;
        border: 0;
        cursor: pointer;
        font-weight: 800;
    }

    .cancelarBtn{
        background: linear-gradient(to right, #850a0a, red, #850a0a);
        color: rgba(0,0,0,0.7);
    }

    .editarBtn{
        color: rgba(0,0,0,0.7);
        background: linear-gradient(to right, #0096c7, #48cae4, #0096c7);
    }
`;