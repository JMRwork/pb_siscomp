import { useEffect, useState } from 'react';
import { listarProdutos } from '../infra/produtos';
import { FormProduto, ListaProdutos } from '../componentes';

export default function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState("");

    useEffect(() => {
        async function fetchProdutos() {
            const novaListaProdutos = await listarProdutos();
            setProdutos(novaListaProdutos);
        }

        fetchProdutos();
    }, [idEmEdicao]);

    return (
        <div>
            <h2>Cadastrar Produtos</h2>
            <FormProduto idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <h2>Listar Produtos</h2>
            <ListaProdutos produtos={produtos} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}