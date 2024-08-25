import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../..";
import { alterarRequisicao, excluirRequisicao, inserirRequisicao, obterRequisicao } from "../../../infra/requisicoes";

export default function FormRequisicao({ usuario, produtos, idEmEdicao, setIdEmEdicao }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const requisicao = await obterRequisicao(idEmEdicao);
                setValue("nome", requisicao.produto.nome);
                setValue("quantidade", requisicao.quantidade);
                setValue("data", requisicao.data);
            } else {
                reset();
            }
        }
        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        dados.produto = JSON.parse(dados.produto);
        if (idEmEdicao) {
            await alterarRequisicao({ ...dados, id: idEmEdicao });
            setIdEmEdicao("");
        } else {
            await inserirRequisicao({ ...dados, usuarioId: usuario.id, status: "aberta" });
            if (idEmEdicao === "") {
                setIdEmEdicao(null);
            } else {
                setIdEmEdicao("");
            }
        }
    }

    async function handleExcluir() {
        await excluirRequisicao(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="form">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="produto">Produto:</label>&nbsp;
                        <select className="formInput" {...register("produto", {
                            required: "Nome do produto é obrigatório"
                        })}><option value="">Selecione um Produto...</option>
                            {
                                produtos.map((produto, index) => { return <option key={index} value={JSON.stringify(produto)}>{produto.nome + " - " + produto.descricao}</option> })}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="quantidade">Quantidade:</label>&nbsp;
                        <input className="formInput" type="number" {...register("quantidade", {
                            required: "A quantidade de items é obrigatória",
                            validate: {
                                minLength: (value) => value >= 1 || "A Quantidade tem de ser pelo menos 1 item",
                            },
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="data">Data:</label>&nbsp;
                        <input className="formInput" type="date" {...register("data", {
                            required: "A data do Requerimento de Compras é obrigatória",
                        })} />
                    </div>
                    <div className="formButtons">
                        <Button variant="contained" size="small" color="primary" type="submit">Salvar</Button>
                        <Button variant="contained" size="small" color="error" onClick={handleExcluir} >Excluir</Button>
                    </div>
                </form>
            </div>
            <div style={{ textAlign: "center" }} className="errorsContainer">
                {errors.produto?.message && (
                    <div>{errors.produto.message}</div>
                )}
                {errors.quantidade?.message && (
                    <div>{errors.quantidade.message}</div>
                )}
                {errors.data?.message && (
                    <div>{errors.data.message}</div>
                )}
            </div>
        </div>
    );
}