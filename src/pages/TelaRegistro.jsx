import { useNavigate } from "react-router-dom";
import { Button, Textfield } from "../componentes";
import { criarUsuario } from "../infra/usuarios";

export default function TelaRegistro() {
    const navigate = useNavigate();

    async function handleRegistrar() {
        const email = document.getElementById("novoEmail").value;
        const senha = document.getElementById("novaSenha").value;
        const confirma = document.getElementById("confirma").value;
        if (senha === confirma) {
            let usuarioVerificado = await criarUsuario(email, senha);
            if (usuarioVerificado.id) {
                alert(`Cadastro Efetuado com Sucesso, id: ${usuarioVerificado.id}`);
                navigate("/login");
            } else {
                alert(usuarioVerificado.erro);
            }
        } else {
            alert("As senhas não são iguais.")
        }
    }

    return (
        <div className="container">
            <h3>Nova Conta</h3>
            <Textfield label="E-mail" type="text" id="novoEmail" />
            <Textfield label="Senha" type="password" id="novaSenha" />
            <Textfield label="Repita a Senha" type="password" id="confirma" />
            <Button variant="contained" onClick={handleRegistrar}>Criar Conta</Button>
        </div>
    );
}