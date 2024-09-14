import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Cotacoes({ cotacoes, requisicoes, setIdEmEdicao }) {
    const [cotacoesPorRequisicao, setCotacoesPorRequisicao] = useState([]);

    useEffect(() => {
        setCotacoesPorRequisicao(cotacoes);
    }, [cotacoes]);

    const colunas = [
        {
            name: 'Fornecedor',
            selector: row => row.fornecedor,
            sortable: true,
        },
        {
            name: 'Requisição',
            selector: row => row.requisicao,
            sortable: true,
        },
        {
            name: 'Descricao',
            selector: row => row.descricao ? row.descricao : 'Sem descrição',
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

    function handleRequisicao(event) {
        const requisicao = event.target.value;
        if (requisicao === "") {
            setCotacoesPorRequisicao(cotacoes);
        } else {
            let cotacoesSelecionadas = cotacoes.filter((cotacao) => cotacao.requisicao === requisicao);
            setCotacoesPorRequisicao(cotacoesSelecionadas);
        }
    }

    return (
        <div>
            <span>Escolha a Requisicao: </span>
            <select onChange={handleRequisicao}>
                <option value="">Todos</option>
                {requisicoes.map((requisicao, index) => {
                    return <option key={index} value={requisicao.id}>{requisicao.produto.nome} - Qtd: {requisicao.quantidade} - {requisicao.produto.descricao}</option>
                })}
            </select>
            <DataTable
                columns={colunas}
                data={cotacoesPorRequisicao}
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
