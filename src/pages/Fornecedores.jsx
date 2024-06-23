import { useEffect, useState } from 'react';
import { FormFornecedor, ListaFornecedores } from '../componentes';
import { listarFornecedores } from '../infra/fornecedores';
import { listarProdutos } from '../infra/produtos';

export default function Fornecedores() {

  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [idEmEdicao, setIdEmEdicao] = useState("");

  useEffect(() => {
    async function fetchFornecedores() {
      const novaListaFornecedores = await listarFornecedores();
      setFornecedores(novaListaFornecedores);
    }
    async function fetchProdutos() {
      const novaListaProdutos = await listarProdutos();
      setProdutos(novaListaProdutos);
    }

    fetchFornecedores();
    fetchProdutos();
  }, [idEmEdicao]);

  return (
    <div>
      <h2>Cadastrar Fornecedor</h2>
      <FormFornecedor produtos={produtos} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
      <h2>Listar Fornecedores</h2>
      <ListaFornecedores fornecedores={fornecedores} setIdEmEdicao={setIdEmEdicao} />
    </div>
  );
}
