import NavBar from './components/NavBar';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//npm start
import Registro from './pages/cliente/Registro';
import RegistroNegocio from './pages/proveedor/Registro';
import Usuario from './pages/proveedor/Usuario';
import HomeCliente from './pages/cliente/HomeCliente';
import Ventas from './pages/proveedor/Ventas';
import Producto from './components/product/Producto';
import Subasta from './components/product/Subasta';
import SubastasList from './components/product/SubastasList';
import HistorialSubastas from './components/product/HistorialSubasta';
import HistorialComponent from './components/product/HistorialComponent';
import Login from './components/Login'

function App() {
  const nickname = localStorage.getItem("nickname") || 2;
  const id = localStorage.getItem("id") || 5;

  // 0 = No logeado
  // 1 = Cliente
  // 2 = Proveedor 
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <>

            {nickname == 0 &&
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/registroNegocio" element={<RegistroNegocio />} />
              </>}
            {nickname == 2 &&
              <>
                <Route path="/proveedor" element={<Usuario user={id} />} />
                <Route path="/proveedor/ventas" element={<Ventas user={id} />} />
                <Route path="/proveedor/productos" element={<Producto user={id} />} />
                <Route path="/proveedor/subasta" element={<Subasta id={id} />} />
                <Route path="/proveedor/subastaList" element={<SubastasList id={id} />} />
                <Route path="/proveedor/misSubastas" element={<HistorialSubastas id={id} />} />
                <Route path="/proveedor/historial" element={<HistorialComponent id={id} />} />

              </>
            }
            {nickname == 1 &&
              <>
                <Route path="/" element={<HomeCliente id={id} />} />
                <Route path="/cliente/:id" element={<Registro />} />
                <Route path="/cliente/subasta" element={<Subasta id={id} />} />
                <Route path="/cliente/subastaList" element={<SubastasList id={id} />} />
                <Route path="/cliente/misSubastas" element={<HistorialSubastas id={id} />} />
                <Route path="/cliente/historial" element={<HistorialComponent id={id} />} />
              </>
            }


          </>

        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;