import { useEffect, useState } from 'react';
import { FormNovaCotacoes, ListaNovaCotacoes } from '../componentes';
import { listarCotacoes } from '../infra/novaCotacoes';
import { listarFornecedores } from '../infra/fornecedores';
import { listarRequisicoes } from '../infra/requisicoes';

export default function Cotacoes() {

    const [requisicoes, setRequisicoes] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [cotacoes, setCotacoes] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState("");

    useEffect(() => {
        async function fetchCotacoes() {
            const novaListaCotacoes = await listarCotacoes();
            setCotacoes(novaListaCotacoes);
        }
        async function fetchFornecedores() {
            const novaListaFornecedores = await listarFornecedores();
            setFornecedores(novaListaFornecedores);
        }
        async function fetchRequisicoes() {
            const novaListaRequisicoes = await listarRequisicoes();
            setRequisicoes(novaListaRequisicoes);
        }

        fetchCotacoes();
        fetchFornecedores();
        fetchRequisicoes();
    }, [idEmEdicao]);

    return (
        <div>
            <h2>Cadastrar Cotações</h2>
            <FormNovaCotacoes fornecedores={fornecedores} requisicoes={requisicoes} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <h2>Listar Cotações</h2>
            <ListaNovaCotacoes cotacoes={cotacoes} requisicoes={requisicoes} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}
