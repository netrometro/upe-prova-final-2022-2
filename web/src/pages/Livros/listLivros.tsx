import { api } from "../../api/axios";
import { useState, useEffect } from "react";
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

interface Livros{
        id:          number;
        titulo:      string;
        descricao:   string;
        autor:       string;
        disponivel:  boolean;
        createdAt:   Date;
        updatedAt:   Date;
        deletedAt?:  Date;
    }
    
export function Listlivros() {

    const navigate = useNavigate();
    const [livros, setLivros] = useState<Livros[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        api.get("/livros")
        .then((response: AxiosResponse<Livros[]>) => {
            setLivros(response.data);
            console.log(response.data);
        })
        .catch((error: Error) => {
            console.error(error);
        });
        console.log(livros);
    }, []);

    const handleSearch = () => {
        api.get("/livros/search/:", {
            params: {
                query: searchTerm
            }
        })
        .then((response: AxiosResponse<Livros[]>) => {
            setLivros(response.data);
            console.log(response.data);
        })
        .catch((error: Error) => {
            console.error(error);
        });
    }
    
    return (
        <div className="tela-list">
            <h1>Livros</h1>
            <br />
            <div className="head">
            <input type="text"  className="button-pesquisa" placeholder="Pesquisar" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
                <button type='button' className="button-search" onClick={handleSearch}>Pesquisar</button>
                <button type='button' className="button-add" onClick={() => navigate('/livros/create')}>Adicionar</button>
            </div>
            <table className="table">
                <thead >
                    <tr>
                        <th className="table-head">Título</th>
                        <th className="table-head">Descrição</th>
                        <th className="table-head">Autor</th>
                        <th className="table-head">Dísponivel</th>
                    </tr>
                </thead>
                <br />
                <tbody >
                    {livros.map(livros => (
                        <tr key={livros.id}>
                            <td className="table-body">{livros.titulo}</td>
                            <td className="table-season">{livros.descricao}</td>
                            <td className="table-season">{livros.autor}</td>
                            <td className="table-season">{livros.disponivel ? "Sim" : "Não"}</td>
                            <td className="table-body">
                                <div className="button-group">
                                    <button type='button' className="button-delete" onClick={() => navigate('/livros/delete/' + livros.id)}>Deletar</button>
                                </div>
                                <div className="button-group">
                                    <button type='button' className="button-edit" onClick={() => navigate('/livros/' + livros.id)}>Editar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
 
}

export default Listlivros;