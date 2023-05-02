import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
import "./put.style.css";

interface Livros {
    id: number;
    titulo: string;
    descricao: string;
    autor: string;
    quantidade: number;
    disponivel: boolean;
}

export function EditLivro() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [livro, setLivro] = useState<Livros>({
        id: 0,
        titulo: "",
        descricao: "",
        autor: "",
        quantidade: 0,
        disponivel: false,
    });

    useEffect(() => {
        async function loadLivro() {
            const response = await api.get(`/livros/${id}`);
            setLivro(response.data);
        }
        loadLivro();
    }, [id]);

    function updateLivro(event: FormEvent) {
        event.preventDefault();
        try {
            const response = api.put(`/livros/${livro.id}`, {
                titulo: livro.titulo,
                descricao: livro.descricao,
                autor: livro.autor,
                quantidade: livro.quantidade,
                disponivel: livro.disponivel,
            });
            alert("Livro atualizado com sucesso");
            console.log(response);
            navigate("/livros");
        } catch (err) {
            console.log(err);
            alert("Erro ao atualizar o livro");
        }
    }

    return (
        <div className="tela">
            <form onSubmit={updateLivro} className="form">
                <h1 className="title">Editar Livro</h1>
                <br />
                <div className="body-livros">
                    <div>
                        <label htmlFor="titulo" className="label-livros">
                            {" "}
                            Título:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            className="input-livros"
                            onChange={(event) =>
                                setLivro({ ...livro, titulo: event.target.value })
                            }
                            value={livro.titulo}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao" className="label-livros">
                            {" "}
                            Descrição:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="descricao"
                            id="descricao"
                            className="input-livros"
                            onChange={(event) =>
                                setLivro({ ...livro, descricao: event.target.value })
                            }
                            value={livro.descricao}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="autor" className="label-livros">
                            {" "}
                            Autor:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="autor"
                            id="autor"
                            className="input-livros"
                            onChange={(event) =>
                                setLivro({ ...livro, autor: event.target.value })
                            }
                            value={livro.autor}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantidade" className="label-livros">
                            {" "}
                            Quantidade:
                        </label>
                        <br />
                        <input
                            type="number"
                            name="quantidade"
                            id="quantidade"
                            className="input-livros"
                            onChange={(event) =>
                                setLivro({ ...livro, quantidade: parseInt(event.target.value) })
                            }
                            value={livro.quantidade}
                            min="0" required
                        />
                    </div>
                    <div>
                        <label htmlFor="disponivel" className="label-livros">
                            O livro está disponivel?
                        </label>
                        <select
                            name="disponivel"
                            className="input-livros"
                            id="disponivel"
                            onChange={(event) =>
                                setLivro({
                                    ...livro,
                                    disponivel: event.target.value === "true"
                                    ,
                                })
                            }
                            value={livro.disponivel.toString()}
                        >
                            <option value="true"
                                selected={livro.disponivel}
                            >
                                Sim
                            </option>
                            <option value="false" selected={!livro.disponivel}>
                                Não
                            </option>
                        </select>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="button-green">
                            Salvar
                        </button>
                        <button
                            type="button"
                            className="button-blue"
                            onClick={() => navigate("/livros")}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default EditLivro;