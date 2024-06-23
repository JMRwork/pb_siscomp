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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fornecedores" element={<Fornecedores />} />
          <Route path="contatos" element={<Contatos />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="cotacoes" element={<Cotacoes />} />
          <Route path="login" element={<TelaLogin />} />
          <Route path="registro" element={<TelaRegistro />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
    </Router>
  );
}
