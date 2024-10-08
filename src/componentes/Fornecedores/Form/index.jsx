import { useForm } from "react-hook-form"
import { regexNumerico } from "../../../utils/Regex";
import { alterarFornecedor, excluirFornecedor, inserirFornecedor, obterFornecedor } from "../../../infra/fornecedores";
import { useEffect } from "react";
import { Button } from "../..";

export default function FormFornecedor({ produtos, idEmEdicao, setIdEmEdicao }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            //Testa se o idEmEdicao está preenchido e veio da lista de contatos
            //Não foi pelo inserir
            if (idEmEdicao && !isSubmitted) {
                const fornecedor = await obterFornecedor(idEmEdicao);
                setValue("nomeFantasia", fornecedor.nomeFantasia);
                setValue("produto", fornecedor.produto)
                setValue("razaoSocial", fornecedor.razaoSocial);
                setValue("cnpj", fornecedor.cnpj);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if (idEmEdicao) {
            await alterarFornecedor({ ...dados, id: idEmEdicao });
            setIdEmEdicao("");
        } else {
            await inserirFornecedor(dados);
            if (idEmEdicao === "") {
                setIdEmEdicao(null);
            } else {
                setIdEmEdicao("");
            }
        }
    }

    async function handleExcluir() {
        await excluirFornecedor(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="form">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="nomeFantasia">Nome Fantasia:</label>&nbsp;
                        <input className="formInput" size={30} {...register("nomeFantasia", {
                            required: "Nome Fantasia é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 5 || "Nome Fantasia tem que ter pelo menos 5 caracteres",
                                maxLength: (value) => value.length <= 50 || "Nome Fantasia só pode ter até 50 caracteres",
                            },
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="razaoSocial">Razão Social:</label>&nbsp;
                        <input className="formInput" size={30} {...register("razaoSocial", {
                            required: "Razão Social é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 5 || "Razão Social tem que ter pelo menos 5 caracteres",
                                maxLength: (value) => value.length <= 50 || "Razão Social só pode ter até 50 caracteres",
                            },
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="cnpj">CNPJ:</label>&nbsp;
                        <input className="formInput" size={14} {...register("cnpj", {
                            required: "CNPJ é obrigatório",
                            validate: {
                                minLength: (value) => value.length == 14 || "CNPJ tem que ter 14 dígitos",
                                matchPattern: (value) => regexNumerico.test(value) || "CNPJ tem que ser numérico",
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
                {errors.nomeFantasia?.message && (
                    <div>{errors.nomeFantasia.message}</div>
                )}
                {errors.produto?.message && (
                    <div>{errors.produto.message}</div>
                )}
                {errors.razaoSocial?.message && (
                    <div>{errors.razaoSocial.message}</div>
                )}
                {errors.cnpj?.message && (
                    <div>{errors.cnpj.message}</div>
                )}
            </div>
        </div>
    );
}