import { logarUsuario } from "../infra/usuarios";
import { Button, Textfield } from "../componentes";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function TelaLogin() {
    const [usuario, setUsuario] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => { if (usuario.isActive === false) { navigate("/inativo"); } else if (usuario.id) { navigate("/") } }, [usuario])

    async function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        let usuarioVerificado = await logarUsuario(email, senha);
        if (usuarioVerificado.id) {
            console.log(usuarioVerificado);
            setUsuario(usuarioVerificado);
            alert(`Login Efetuado com Sucesso, id: ${usuarioVerificado.id}`);
        } else {
            alert(usuarioVerificado.erro);
        }
    }

    return (
        <div className="container">
            <h3>Login</h3>
            <Textfield type="email" id="email" label="E-mail" />
            <Textfield type="password" id="senha" label="Senha" />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </div>
    );
}