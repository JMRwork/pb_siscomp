import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from './pages/Layout';
import Home from "./pages/Home";
import Fornecedores from "./pages/Fornecedores";
import Contatos from "./pages/Contatos";
import Produtos from "./pages/Produtos";
import Cotacoes from "./pages/Cotacoes";
import NaoEncontrado from "./pages/NaoEncontrado";
import TelaLogin from "./pages/TelaLogin";
import TelaRegistro from "./pages/TelaRegistro";
import TelaGerencia from "./pages/TelaGerencia";
import TelaInativo from "./pages/TelaInativo";
import { useState } from "react";
import Requisicoes from "./pages/Requisicoes";
import NovaCotacoes from "./pages/NovaCotacoes";

export default function App() {
  const [usuario, setUsuario] = useState({ id: "", email: "", isActive: "", isAdmin: "" });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout usuario={usuario} setUsuario={setUsuario} />}>
          <Route index element={<Home />} />
          {usuario.isActive === true ? usuario.isAdmin === true ?
            <>
              <Route path="fornecedores" element={<Fornecedores />} />
              <Route path="contatos" element={<Contatos />} />
              <Route path="produtos" element={<Produtos />} />
              <Route path="cotacoes" element={<Cotacoes />} />
              <Route path="novaCotacoes" element={<NovaCotacoes />} />
              <Route path="gerencia-contas" element={<TelaGerencia />} />
            </>
            :
            <Route path="requisicoes" element={<Requisicoes />} />
            : <Route path="inativo" element={<TelaInativo />} />}
          <Route path="login" element={<TelaLogin />} />
          <Route path="registro" element={<TelaRegistro />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
    </Router>
  );
}
