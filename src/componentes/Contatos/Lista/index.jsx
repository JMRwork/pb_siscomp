import DataTable from 'react-data-table-component';

export default function Contatos({ contatos = [], setIdEmEdicao }) {
    const colunas = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: 'Fornecedor',
            selector: row => row.fornecedor,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Telefone',
            selector: row => row.fone,
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

    return (
        <DataTable
            columns={colunas}
            data={contatos}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            defaultSortFieldId={1}
            selectableRows
            selectableRowsHighlight
            selectableRowsSingle
            onSelectedRowsChange={handleChange}
        />
    );
}
