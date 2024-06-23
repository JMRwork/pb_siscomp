import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Fornecedores({ cotacoes, produtos, setIdEmEdicao }) {
    const [cotacaoPorProduto, setCotacaoPorProduto] = useState([]);

    useEffect(() => {
        setCotacaoPorProduto(cotacoes);
    }, [cotacoes]);

    const colunas = [
        {
            name: 'Fornecedor',
            selector: row => row.fornecedor,
            sortable: true,
        },
        {
            name: 'Produto',
            selector: row => row.produto,
            sortable: true,
        },
        {
            name: 'Data',
            selector: row => row.data,
        },
        {
            name: 'Preço',
            selector: row => row.preco,
        },
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

    function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        console.log(id);
        if (id) {
            setIdEmEdicao(id);
        } else {
            setIdEmEdicao("");
        }
    }

    function handleProduto(event) {
        const produto = event.target.value;
        if (produto === "") {
            setCotacaoPorProduto(cotacoes);
        } else {
            let cotacoesSelecionadas = [];
            cotacoes.map((cotacao) => {
                if (cotacao.produto === produto) {
                    cotacoesSelecionadas.push(cotacao);
                }
            });
            setCotacaoPorProduto(cotacoesSelecionadas);
        }
    }

    return (
        <div>
            <span>Escolha o Produto: </span>
            <select onChange={handleProduto}>
                <option value="">Todos</option>
                {produtos.map((produto, index) => {
                    return <option key={index} value={produto.nome}>{produto.nome}</option>
                })}
            </select>
            <DataTable
                columns={colunas}
                data={cotacaoPorProduto}
                pagination
                paginationPerPage={5}
                dense
                responsive
                striped
                paginationComponentOptions={opcoes}
                noDataComponent="Cadastro vazio!"
                defaultSortFieldId={1}
                selectableRows
                selectableRowsHighlight
                selectableRowsSingle
                onSelectedRowsChange={handleChange}
            />
        </div>
    );
}
