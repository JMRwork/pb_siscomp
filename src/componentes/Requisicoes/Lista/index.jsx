import { useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Requisicoes({ requisicoes, setIdEmEdicao }) {
    const [requisicao, setRequisicao] = useState("");

    const colunas = [
        {
            name: 'Produto',
            selector: row => row.produto.nome,
            sortable: true,
        },
        {
            name: 'Descrição',
            selector: row => row.produto.descricao,
            sortable: true,
        },
        {
            name: 'quantidade',
            selector: row => row.quantidade,
        },
        {
            name: 'Data',
            selector: row => row.data,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        }
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
        if (requisicao) {
            setRequisicao(requisicao);
        }
    }

    return (
        <div>
            <span>Escolha a Requisição para ver as cotações: </span>
            <select onChange={handleRequisicao}>
                <option value="">Selecione uma requisição...</option>
                {requisicoes.map((requisicao, index) => {
                    return <option key={index} value={requisicao}>{requisicao.produto.nome + " - " + requisicao.data}</option>
                })}
            </select>
            <div>
                {requisicao.cotacoes ? requisicao.cotacoes.map((value, index) => <p key={index}>{value}</p>)
                    : requisicao === "" ? null : <p>Requisição sem cotações.</p>}
            </div>
            <DataTable
                columns={colunas}
                data={requisicoes}
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