import { useEffect, useState } from 'react';
import { FormCotacao, ListaCotacoes } from '../componentes';
import { listarCotacoes } from '../infra/cotacoes';
import { listarFornecedores } from '../infra/fornecedores';
import { listarProdutos } from '../infra/produtos';

export default function Cotacoes() {

    const [produtos, setProdutos] = useState([]);
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
        async function fetchProdutos() {
            const novaListaProdutos = await listarProdutos();
            setProdutos(novaListaProdutos);
        }

        fetchCotacoes();
        fetchFornecedores();
        fetchProdutos();
    }, [idEmEdicao]);

    return (
        <div>
            <h2>Cadastrar Fornecedor</h2>
            <FormCotacao fornecedores={fornecedores} produtos={produtos} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <h2>Listar Fornecedores</h2>
            <ListaCotacoes cotacoes={cotacoes} produtos={produtos} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}
