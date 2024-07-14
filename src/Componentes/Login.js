import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/reducers/Login/authSlice'; // ajuste o caminho conforme necessário
import Loading from './Loading';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(true);

    const handleLogin = () => {
      const user = { email, password }; // simulando dados do usuário
      dispatch(loginSuccess(user)); // dispara a action de sucesso de login
    };
  
    return (
      <LoginContainer>
        <LoginBox>
          <h1>POUSADA</h1>
          <LoginBoxInput>
            <span>USUÁRIO</span>
            <input
              placeholder='...'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LoginBoxInput>
          <LoginBoxInput>
            <span>SENHA</span>
            <input
              placeholder='...'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LoginBoxInput>
          <button onClick={handleLogin}>ENTRAR</button>
        </LoginBox>
      </LoginContainer>
    );
  };
  

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #000814, #001d3d, #000814);
`;

const LoginBox = styled.div`
  width: 90%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
  background: linear-gradient(to left, #001d3d, #003566, #001d3d);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 30px;

  h1 {
    margin: 0;
    color: #90e0ef;
  }

  button {
    width: 100%;
    height: 35px;
    font-weight: 600;
    background: linear-gradient(to right, #00b4d8, #90e0ef);
    border: 0;
  }
`;

const LoginBoxInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;

  span {
    font-size: 22px;
    font-weight: 600;
    color: #ebf2fa;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding-left: 20px;
    background-color: #ebf2fa;
    border: 0;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  }
`;
