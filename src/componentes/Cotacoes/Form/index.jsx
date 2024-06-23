import { useForm } from "react-hook-form"
import { regexPreco } from "../../../utils/Regex";
import { alterarCotacao, excluirCotacao, inserirCotacao, obterCotacao } from "../../../infra/cotacoes";
import { useEffect } from "react";
import { Button } from "../..";

export default function FormFornecedor({ fornecedores, produtos, idEmEdicao, setIdEmEdicao }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            //Testa se o idEmEdicao está preenchido e veio da lista de contatos
            //Não foi pelo inserir
            if (idEmEdicao && !isSubmitted) {
                const cotacao = await obterCotacao(idEmEdicao);
                setValue("fornecedor", cotacao.fornecedor);
                setValue("produto", cotacao.produto)
                setValue("preco", cotacao.preco);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if (idEmEdicao) {
            await alterarCotacao({ ...dados, id: idEmEdicao });
            setIdEmEdicao("");
        } else {
            await inserirCotacao(dados);
            if (idEmEdicao == "") {
                setIdEmEdicao(null);
            } else {
                setIdEmEdicao("");
            }
        }
    }

    async function handleExcluir() {
        await excluirCotacao(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="form">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="fornecedor">Fornecedor:</label>&nbsp;
                        <select className="formInput" {...register("fornecedor", {
                            required: "O Fornecedor deve ser escolhido. Se não houver registre o fornecedor primeiro.",
                        })}>
                            {fornecedores.map((value, index) => {
                                return <option key={index} value={value.nomeFantasia}>{value.nomeFantasia}</option>
                            })}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="produto">Produto:</label>&nbsp;
                        <select className="formInput" {...register("produto", {
                            required: "O produto deve ser escolhido. Se não houver registre o produto primeiro.",
                        })}>
                            {produtos.map((value, index) => {
                                return <option key={index} value={value.nome}>{value.nome}</option>
                            })}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="data">Data:</label>&nbsp;
                        <input className="formInput" type="date" {...register("data", {
                            required: "A data da cotação é obrigatória",
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="preco">Preço:</label>&nbsp;
                        <input className="formInput" size={14} {...register("preco", {
                            required: "O preço é obrigatório",
                            validate: {
                                matchPattern: (value) => regexPreco.test(value) || "O preço tem que ser um valor monetario válido",
                            },
                        })} />
                    </div>
                    <div className="formButtons">
                        <Button variant="contained" size="small" color="primary" type="submit">Salvar</Button>
                        <Button variant="contained" size="small" color="error" onClick={handleExcluir} >Excluir</Button>
                    </div>
                </form>
            </div>
            <div style={{ textAlign: "center" }} className="errorsContainer">
                {errors.fornecedor?.message && (
                    <div>{errors.fornecedor.message}</div>
                )}
                {errors.produto?.message && (
                    <div>{errors.produto.message}</div>
                )}
                {errors.data?.message && (
                    <div>{errors.data.message}</div>
                )}
                {errors.preco?.message && (
                    <div>{errors.preco.message}</div>
                )}
            </div>
        </div>
    );
}