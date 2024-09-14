import { useForm } from "react-hook-form"
import { regexPreco } from "../../../utils/Regex";
import { alterarCotacao, excluirCotacao, inserirCotacao, obterCotacao } from "../../../infra/novaCotacoes";
import { useEffect } from "react";
import { Button } from "../..";
import { alterarRequisicao, obterRequisicao } from "../../../infra/requisicoes";

export default function FormCotacoes({ fornecedores, requisicoes, idEmEdicao, setIdEmEdicao }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            //Testa se o idEmEdicao está preenchido e veio da lista de contatos
            //Não foi pelo inserir
            if (idEmEdicao && !isSubmitted) {
                const cotacao = await obterCotacao(idEmEdicao);
                setValue("fornecedor", cotacao.fornecedor);
                setValue("requisicao", cotacao.requisicao);
                setValue("descricao", cotacao.descricao);
                setValue("data", cotacao.data);
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
            const requisicao = await obterRequisicao(dados.requisicao);
            const cotacoes = requisicao.cotacoes ? [...requisicao.cotacoes] : [];
            let cotacaoId;
            let status;
            if (cotacoes.length < 3) {
                cotacaoId = await inserirCotacao(dados);
                status = cotacoes.length === 2 ? "Cotado" : "Em Cotação";
            }
            if (cotacoes.length === 3) {
                alert("A requisicao já atingiu o limite de 3 cotações.");
            } else {
                cotacoes.push({ ...dados, id: cotacaoId });
                await alterarRequisicao({ ...requisicao, status: status, cotacoes: cotacoes });
            }




            if (idEmEdicao == "") {
                setIdEmEdicao(null);
            } else {
                setIdEmEdicao("");
            }
        }
    }

    async function handleExcluir() {
        const cotacao = await obterCotacao(idEmEdicao);
        const requisicao = await obterRequisicao(cotacao.requisicao);
        const cotacoesReq = requisicao.cotacoes.filter((value) => value.id !== idEmEdicao);
        let status;
        if (cotacoesReq.length >= 1) {
            status = "Em Cotação";
        } else if (cotacoesReq.length === 0) {
            status = "aberta";
        }
        await alterarRequisicao({ ...requisicao, status: status, cotacoes: cotacoesReq });
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
                        <label className="formLabel" htmlFor="requisicao">Requisição:</label>&nbsp;
                        <select className="formInput" {...register("requisicao", {
                            required: "A Requisição deve ser escolhida. Se não houver registre uma requisição primeiro.",
                        })}>
                            {requisicoes.map((value, index) => {
                                return <option key={index} value={value.id}>{value.produto.nome} - Qtd:{value.quantidade} - {value.produto.descricao}</option>
                            })}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel" htmlFor="descricao">Descrição:</label>&nbsp;
                        <textarea className="formInput" {...register("descricao")} />
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
                {errors.requisicao?.message && (
                    <div>{errors.requisicao.message}</div>
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