import DataTable from 'react-data-table-component';

export default function ListaProdutos({ produtos = [], setIdEmEdicao }) {

    const colunas = [
        {
            name: 'Produto',
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: 'Descrição',
            selector: row => row.descricao,
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
        <div>
            <DataTable
                columns={colunas}
                data={produtos}
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
