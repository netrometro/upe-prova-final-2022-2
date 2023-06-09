import { api } from "../../api/axios";
import { useState, useEffect } from "react";
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

interface DragQueens{
        id: number;
        name: string;
        season: number;
        winner: boolean;
        info?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    }
    
export function ListdragQueens() {

    
    const navigate = useNavigate();
    const [dragQueens, setDragQueens] = useState<DragQueens[]>([]);
    
    useEffect(() => {
        api.get("/dragQueens")
        .then((response: AxiosResponse<DragQueens[]>) => {
            setDragQueens(response.data);
            console.log(response.data);
        })
        .catch((error: Error) => {
            console.error(error);
        });
    });

    function searchDragQueen(dragQueen: DragQueens, search: string): boolean {
        const searchWinners = search === "vencedoras" ? true : search === "perdedoras" ? false : undefined;
        return dragQueen.name.toLowerCase().includes(search.toLowerCase())
            || dragQueen.season.toString().includes(search.toLowerCase()) 
            || dragQueen.winner === searchWinners;

    }   

    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const filteredDragQueens = dragQueens.filter((dragQueen) =>
        searchDragQueen(dragQueen, searchTerm)
    );

    
    return (
        <div className="tela-queens">
            <h1 className="tittle-queens">Drag Queens</h1>
            <p>Lista de drag queens que participaram de Rupaul's Drag Race</p>
            <br />
            <div className="head">
                <input type="text" className="input-queens" placeholder="Buscar" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                <button type='button' className="button-green" onClick={() => navigate('/dragQueens/create')}>Adicionar</button>
            </div>
            <table className="table">
                <thead >
                    <tr>
                        <th className="table-head">Nome</th>
                        <th className="table-head">Temporada</th>
                        <th className="table-head">Vencedora</th>
                        <th className="table-head">Informações</th>
                        <th className="table-head">Ações</th>
                    </tr>
                </thead>
                <tbody >
                    {filteredDragQueens.map((dragQueens) => (
                        <tr key={dragQueens.id}>
                            <td className="table-body">{dragQueens.name}</td>
                            <td className="table-season">{dragQueens.season}</td>
                            <td className="table-season">{dragQueens.winner ? "Sim" : "Não"}</td>
                            <td className="table-body">{dragQueens.info}</td>
                            <td className="table-body">
                                <div className="button-group">
                                    <button type='button' className="button-blue" onClick={() => navigate(`/dragQueens`)}>Editar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
 
}

export default ListdragQueens;

