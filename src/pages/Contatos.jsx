import { useEffect, useState } from 'react';
import { FormContato, ListaContatos } from '../componentes'
import { listarContatos } from '../infra/contatos';
import { listarFornecedores } from '../infra/fornecedores';

export default function Contatos() {


    const [contatos, setContatos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState("");

    useEffect(() => {
        async function fetchData() {
            const novaListaContatos = await listarContatos();
            setContatos(novaListaContatos);
        }
        async function fetchFornecedores() {
            const novaListaFornecedores = await listarFornecedores();
            setFornecedores(novaListaFornecedores);
        }
        fetchData();
        fetchFornecedores();
    }, [idEmEdicao]);

    return (
        <>
            <h2>Cadastro de Contatos</h2>
            <FormContato fornecedores={fornecedores} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <h2>Lista Contatos</h2>
            <ListaContatos contatos={contatos} setIdEmEdicao={setIdEmEdicao} />
        </>
    )
}

