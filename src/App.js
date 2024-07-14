import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './Redux/reducers/Login/authSlice';
import CadastrarCliente from './Componentes/CadastrarCliente';
import Cliente from './Componentes/Cliente';
import Clientes from './Componentes/Clientes';
import Login from './Componentes/Login';
import RealizarReserva from './Componentes/RealizarReserva';
import Reserva from './Componentes/Reserva';
import Reservas from './Componentes/Reservas';
import SideBar from './Componentes/Sidebar';

const data_static = {
  nomeCompleto: "Ana Maria Silva",
  contato: "(11) 91234-5678",
  checkin: "20/01/2025",
  checkout: "25/01/2025",
  quantidadePessoas: 2,
  apartamentosUsados: { mayra: false, gilmar: true, caiua: false, trancoso: false, nathalia: true, master: false },
  reservaConfirmada: true,
  valorJaPago: 500.00
};

const cliente_static = {
  nomeCompleto: "Ana Maria Silva",
  contato: "(11) 91234-5678",
  cpf: "123.456.789-00",
  endereco: {
    rua: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cep: "12345-678",
    cidade: "São Paulo"
  },
  dataDeNascimento: "01/01/1980"
};

const NAV_LINKS = [
  { name: "RESERVAS", path: "/" },
  { name: "CLIENTES", path: "/clientes" },
  { name: "CADASTRAR", path: "/cadastrar-cliente" },
  { name: "RESERVAR", path: "/realizar-reserva" },
];

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const handleClienteSelecionado = (cliente) => {
    setClienteSelecionado(cliente);
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(loginSuccess(user));
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <SideBar NAV_LINKS={NAV_LINKS} />}
        <Routes>
          {!isAuthenticated ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route path="/" element={<Reservas />} />
              <Route path="/reserva" element={<Reserva reserva={data_static} />} />
              <Route path="/clientes" element={<Clientes onClienteSelect={handleClienteSelecionado} />} />
              <Route path="/cliente" element={<Cliente cliente={clienteSelecionado} />} />
              <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
              <Route path="/realizar-reserva" element={<RealizarReserva />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
