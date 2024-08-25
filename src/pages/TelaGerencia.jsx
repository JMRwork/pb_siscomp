import DataTable from 'react-data-table-component';
import { Switch } from '../componentes';
import { useEffect, useState } from 'react';
import { alterarUsuario, listarUsuarios } from '../infra/usuarios';

export default function TelaGerencia() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const listaUsuarios = await listarUsuarios();
            setUsuarios(listaUsuarios);
        }
        fetchUsers();
    }, []);

    async function handleChange(row, action) {
        const usuario = row;
        if (action === 'ativo') {
            usuario.isActive = !usuario.isActive;
        }
        if (action === 'admin') {
            usuario.isAdmin = !usuario.isAdmin;
        }
        // Erro aqui!
        alterarUsuario(usuario);
        const listaUsuarios = await listarUsuarios();
        setUsuarios(listaUsuarios);
    }

    const colunas = [{
        name: "E-mail",
        selector: row => row.email,
        sortable: true
    }, {
        name: "Está Ativo?",
        cell: row => <Switch checked={row.isActive} onChange={() => handleChange(row, 'ativo')} />,
        button: true

    }, {
        name: "É Admin?",
        cell: row => <Switch checked={row.isAdmin} onChange={() => handleChange(row, 'admin')} />,
        button: true
    }]

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };
    return (<>
        <h2>Gerência de Contas</h2>
        <DataTable
            columns={colunas}
            data={usuarios}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            defaultSortFieldId={1}
            selectableRowsComponent={Switch}
        />
    </>);
}