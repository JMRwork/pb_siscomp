import { useEffect, useState } from "react";
import { FormRequisicao, ListaRequisicoes } from "../componentes";
import { listarProdutos } from "../infra/produtos";
import { listarRequisicoesPorColaborador } from "../infra/requisicoes";
import { useOutletContext } from "react-router-dom";

export default function Requisicoes() {
    const [usuario] = useOutletContext();
    const [requisicoes, setRequisicoes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState("");

    useEffect(() => {
        async function fetchProdutos() {
            const novaListaProdutos = await listarProdutos();
            setProdutos(novaListaProdutos);
        }
        async function fetchRequisicoes() {
            const novaListaRequisicoes = await listarRequisicoesPorColaborador(usuario.id);
            setRequisicoes(novaListaRequisicoes);
        }
        fetchProdutos();
        fetchRequisicoes();
    }, [idEmEdicao]
    );

    return (<div>
        <h2>Cadastrar Requisições de Compra</h2>
        <FormRequisicao usuario={usuario} produtos={produtos} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
        <h2>Lista Status das Requisições</h2>
        <ListaRequisicoes requisicoes={requisicoes} setIdEmEdicao={setIdEmEdicao} />
    </div>);
}