import axios from "axios";
import { useEffect, useState } from "react";

export default function Escola() {
    const api = import.meta.env.VITE_API_URL;

    interface Escola {
        id: number;
        name: string;
        qntdSalas: number;
        qntdAlunos: number;
        tipo: string;
    }

    const [data, setData] = useState({
        name: "",
        qntdSalas: 0,
        qntdAlunos: 0,
        tipo: ""
    })

    const [escolas, setEscolas] = useState<Escola[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getEscolas = async () => {
        const escola = await axios.get(`${api}/escola`);
        console.log(escola.data)
        setEscolas(escola.data)
        //setEscolas();
    }

    const escolasFiltradas = escolas.filter(escola => escola.name.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        getEscolas();
    }, [])

    const save = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            ev.preventDefault();
            await axios.post(`${api}/escola`, data);
            alert("Escola cadastrada")
        } catch (e) {
            alert("Erro")
        }
        getEscolas();
    }

    return (
      <div>
        <form onSubmit={save}>

        <label>Nome:</label>
        <input placeholder="nome" required value={data.name} onChange={(ev) => setData({...data, name: ev.target.value})}/>
        <label>Quantidade de salas: </label>
        <input type="number" required placeholder="Quantidade de salas" value={data.qntdSalas} onChange={(ev) => setData({...data, qntdSalas: parseInt(ev.target.value)})}/>
        <label>Quantidade de alunos:</label>
        <input type="number" required placeholder="Quantidade de aluno" value={data.qntdAlunos} onChange={(ev) => setData({...data, qntdAlunos: parseInt(ev.target.value)})}/>
        <label>Tipo: </label>
        <input type="text" required placeholder="Tipo" value={data.tipo} onChange={(ev) => setData({...data, tipo: ev.target.value})}/>

        <button type="submit">Salvar</button>
        </form>

        <input type="text" placeholder='Pesquisar' value={searchTerm} onChange={event => {setSearchTerm(event.target.value)}}/>

        <div>
            {
                escolasFiltradas?.length ? escolasFiltradas.map((data: any) =>
                <div>
                    <div key={data.id}>
                        <h2>Nome: {data.name}</h2>
                        <h4>Quantidade de alunos: {data.qntdAlunos}</h4>
                        <h4>Quantidade de salas: {data.qntdSalas}</h4>
                        <h4>Tipo(Primaria, secundaria): {data.tipo}</h4>
                    </div >
                    <div>----------------------------------------</div>
                </div>
                ) : <div>Nenhuma escola</div>
            }
        </div>
      </div>
    );
  }