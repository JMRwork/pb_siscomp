import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../../utils/Regex";
import { alterarContato, excluirContato, inserirContato, obterContato } from "../../../infra/contatos";
import { useEffect } from "react";
import { Button } from "../..";

export default function FormContato({ fornecedores, idEmEdicao, setIdEmEdicao }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            //Testa se o idEmEdicao está preenchido e veio da lista de contatos
            //Não foi pelo inserir
            if (idEmEdicao && !isSubmitted) {
                const contato = await obterContato(idEmEdicao);
                setValue("nome", contato.nome);
                setValue("fornecedor", contato.fornecedor);
                setValue("email", contato.email);
                setValue("fone", contato.fone);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if (idEmEdicao) {
            await alterarContato({ ...dados, id: idEmEdicao });
            setIdEmEdicao("");
        } else {
            await inserirContato(dados);
            if (idEmEdicao === "") {
                setIdEmEdicao(null);
            } else {
                setIdEmEdicao("");
            }
        }
    }

    async function handleExcluir() {
        await excluirContato(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="form">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="nome">Nome:</label>&nbsp;
                        <input className="formInput" size={30} {...register("nome", {
                            required: "Nome é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                                maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                            },
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="fornecedor">Fornecedor:</label>&nbsp;
                        <select className="formInput" {...register("fornecedor", {
                            required: "O Fornecedor deve ser escolhido. Se não houver registre o fornecedor primeiro.",
                        })}>
                            {fornecedores.map((value, index) => {
                                return <option key={index} value={value.nomeFantasia}>{value.nomeFantasia + "(" + value.produto + ")"}</option>
                            })}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="email">Email:</label>&nbsp;
                        <input className="formInput" size={30} {...register("email", {
                            required: "Email é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 5 || "Email tem que ter pelo menos 5 caracteres",
                                maxLength: (value) => value.length <= 30 || "Email só pode ter até 30 caracteres",
                                matchPattern: (value) => regexEmail.test(value) || "Email inválido",
                            },
                        })} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="fone">Telefone:</label>&nbsp;
                        <input className="formInput" size={14} {...register("fone", {
                            required: "Telefone é obrigatório",
                            validate: {
                                minLength: (value) => value.length >= 8 || "Telefone tem que ter pelo menos 8 dígitos",
                                matchPattern: (value) => regexNumerico.test(value) || "Telefone tem que ser numérico",
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
                {errors.fornecedor?.message && (
                    <div>{errors.fornecedor.message}</div>
                )}
                {errors.email?.message && (
                    <div>{errors.email.message}</div>
                )}
                {errors.fone?.message && (
                    <div>{errors.fone.message}</div>
                )}
            </div>
        </div>
    );
}