import { useForm } from "react-hook-form"
import { alterarProduto, excluirProduto, inserirProduto, obterProduto } from "../../../infra/produtos";
import { useEffect } from "react";
import { Button } from "../..";

export default function FormProdutos({ idEmEdicao, setIdEmEdicao }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const produto = await obterProduto(idEmEdicao);
                setValue("nome", produto.nome);
                setValue("descricao", produto.descricao);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if (idEmEdicao) {
            await alterarProduto({ ...dados, id: idEmEdicao });
            setIdEmEdicao("");
        } else {
            let id = await inserirProduto(dados);
            if (idEmEdicao === "") {
                setIdEmEdicao(null);
            } else {
                setIdEmEdicao("");
            }
        }
    }

    async function handleExcluir() {
        await excluirProduto(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="form">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="nome">Nome:</label>&nbsp;
                        <input className="formInput" size={30} {...register("nome", {
                            required: "Nome do produto é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 3 || "Nome do produto tem que ter pelo menos 3 caracteres",
                                maxLength: (value) => value.length <= 50 || "Nome do produto só pode ter até 50 caracteres",
                            },
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="descricao">Descrição:</label>&nbsp;
                        <input className="formInput" size={30} {...register("descricao", {
                            required: "Uma descrição é obrigatória",
                            validate: {
                                minLength: (value) => value.length >= 5 || "Uma descrição tem que ter pelo menos 5 caracteres",
                                maxLength: (value) => value.length <= 100 || "Uma descrição só pode ter até 100 caracteres",
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
                {errors.nome?.message && (
                    <div>{errors.nome.message}</div>
                )}
                {errors.descricao?.message && (
                    <div>{errors.descricao.message}</div>
                )}
            </div>
        </div>
    );
}