import { Outlet, Link } from "react-router-dom";
import { BarraLogin } from "../componentes";
import { Menu } from "@mui/icons-material";

export default function Layout({ usuario, setUsuario }) {

    function handleMenu() {
        const menu = document.getElementById("menu");
        if (menu.style.display === "none") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <BarraLogin usuario={usuario} setUsuario={setUsuario} />
            {usuario.id &&
                <div id="layout">
                    <nav>
                        <div onClick={handleMenu} id="hamburgMenu">
                            <Menu color="secundary" fontSize="large" sx={{ margin: "12px 14px" }} />
                        </div>
                        <ul id="menu">
                            <li>
                                <Link to={"/"}>Início</Link>
                            </li>
                            {usuario.isActive ? usuario.isAdmin === true ?
                                <>
                                    <li>
                                        <Link to={"/fornecedores"}>Fornecedores</Link>
                                    </li>
                                    <li>
                                        <Link to={"/contatos"}>Contatos</Link>
                                    </li>
                                    <li>
                                        <Link to={"/produtos"}>Produtos</Link>
                                    </li>
                                    <li>
                                        <Link to={"/cotacoes"}>Cotações</Link>
                                    </li>
                                    <li>
                                        <Link to={"/novaCotacoes"}>Cotações via Requisições</Link>
                                    </li>
                                    <li>
                                        <Link to={"/gerencia-contas"}>Gerenciar Contas</Link>
                                    </li>
                                </>
                                :
                                <li>
                                    <Link to={"/requisicoes"}>Requisições de Compra</Link>
                                </li>
                                :
                                <li>
                                    <Link to={"/inativo"}>Status do Usuário</Link>
                                </li>}
                        </ul>
                    </nav>
                    <Outlet context={[usuario, setUsuario]} />
                </div>
            }
        </div>
    )
}
