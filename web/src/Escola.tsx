import axios from "axios";
import { useState } from "react";

export default function Escola() {

    const [data, setData] = useState({
        name: "",
        qntdSalas: 0,
        qntdAlunos: 0,
        tipo: ""
    })

    const save = async (ev: any) => {
        try {
            ev.preventDefault();
            await axios.post("http://127.0.0.1:3333/escola", data);
            alert("Escola cadastrada")
        } catch (e) {
            alert("Erro")
        }
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
      </div>
    );
  }