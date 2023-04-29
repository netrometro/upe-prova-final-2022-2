import axios from "axios";
import { useEffect, useState } from "react";

export default function Escola() {

    const [data, setData] = useState({
        name: "",
        qntdSalas: 0,
        qntdAlunos: 0,
        tipo: ""
    })

    const [escolas, setEscolas] = useState([]);

    const getEscolas = async () => {
        const escola = await axios.get('https://upeprovafinal.onrender.com/escola');
        console.log(escola.data)
        setEscolas(escola.data)
        //setEscolas();
    }

    useEffect(() => {
        getEscolas();
    }, [])

    const save = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            ev.preventDefault();
            await axios.post("https://upeprovafinal.onrender.com/escola", data);
            alert("Escola cadastrada")
        } catch (e) {
            alert("Erro")
        }
        getEscolas();
    }

    return (
      <div>
        <form onSubmit={save}>

        <input placeholder="nome" required value={data.name} onChange={(ev) => setData({...data, name: ev.target.value})}/>
        <input type="number" required placeholder="Quantidade de salas" value={data.qntdSalas} onChange={(ev) => setData({...data, qntdSalas: parseInt(ev.target.value)})}/>
        <input type="number" required placeholder="Quantidade de aluno" value={data.qntdAlunos} onChange={(ev) => setData({...data, qntdAlunos: parseInt(ev.target.value)})}/>
        <input type="text" required placeholder="Tipo" value={data.tipo} onChange={(ev) => setData({...data, tipo: ev.target.value})}/>

        <button type="submit">Salvar</button>
        </form>

        <div>
            {
                escolas?.length ? escolas.map((data: any) =>
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