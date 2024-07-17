import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './Redux/reducers/Login/authSlice';
import { setLoading } from './Redux/reducers/Load/loadingSlice'; // Importar a ação de carregamento
import CadastrarCliente from './Componentes/CadastrarCliente';
import Cliente from './Componentes/Cliente';
import Clientes from './Componentes/Clientes';
import Login from './Componentes/Login';
import RealizarReserva from './Componentes/RealizarReserva';
import Reserva from './Componentes/Reserva';
import Reservas from './Componentes/Reservas';
import SideBar from './Componentes/Sidebar';
import Loading from './Componentes/Loading'; // Importar o componente Loading
import Haveres from './Componentes/Haveres';

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

const NAV_LINKS = [
  { name: "RESERVAS", path: "/" },
  { name: "CLIENTES", path: "/clientes" },
  { name: "CADASTRAR", path: "/cadastrar-cliente" },
  { name: "RESERVAR", path: "/realizar-reserva" },
  { name: "HAVERES", path: "/haveres" },
];

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.loading); // Obter o estado de carregamento
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [reservaSelecionado, setReservaSelecionado] = useState(null);

  const handleClienteSelecionado = (cliente) => {
    setClienteSelecionado(cliente);
  };

  const handleReservaSelecionado = (reserva) => {
    setReservaSelecionado(reserva);
  };

  useEffect(() => {
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
        {isLoading && <Loading load={isLoading} />} {/* Renderizar o componente Loading */}
        <SideBar NAV_LINKS={NAV_LINKS} />
        <Routes>
            <Route path="/" element={<Reservas onReservaSelect={handleReservaSelecionado} />} />
            <Route path="/reserva" element={<Reserva reserva={reservaSelecionado} />} />
            <Route path="/clientes" element={<Clientes onClienteSelect={handleClienteSelecionado} />} />
            <Route path="/cliente" element={<Cliente cliente={clienteSelecionado} />} />
            <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
            <Route path="/realizar-reserva" element={<RealizarReserva />} />
            <Route path="/haveres" element={<Haveres onClienteSelect={handleClienteSelecionado}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
