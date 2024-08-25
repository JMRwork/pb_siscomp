import { Link, Outlet, redirect } from "react-router-dom";
import { deslogarUsuario } from "../../infra/usuarios";

export default function BarraLogin({ usuario, setUsuario }) {

    if (usuario.id) {
        if (usuario.isActive === false) {
            redirect("/inativo");
        }
        return <Logout usuario={usuario} setUsuario={setUsuario} />;
    } else {
        return (<>
            <nav>
                <ul>
                    <li><Link to={"/"}>Início</Link ></li>
                    <li><Link to={"/login"}>Login</Link ></li>
                    <li><Link to={"/registro"}>Registrar Conta</Link ></li>
                </ul>
            </nav>
            <Outlet context={[usuario, setUsuario]} />
        </>)
    }
}

function Logout({ usuario, setUsuario }) {
    async function handleClick() {
        let retorno = await deslogarUsuario();
        setUsuario(retorno);
    }

    return (
        <nav>
            <ul id="logoutMenu">
                <li><b>{usuario.email}</b>{usuario.isAdmin ? "(Admin)" : "(Colaborador)"}</li>
                <li onClick={handleClick}><span>Logout</span></li>
            </ul>
        </nav>
    )
}