import React, { useEffect, useState } from "react";
import api from "../../api";
// -> LocalHost
// import api from "../../services/api";

export default function ListFilmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("filmes");
        setFilmes(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadFilmes();
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "10vh auto",
          padding: "24px",
          borderRadius: "5px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1>Lista dos seus filmes</h1>
        <table style={{width: "100%", gap:"10%"}}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Duração</th>
              <th>Em cartaz</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((filme) => (
              <tr key={filme.id}>
                <td>{filme.titulo}</td>
                <td>{filme.descricao}</td>
                <td>{filme.duracao} min</td>
                <td>{filme.em_cartaz ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: "20px",
          left: "50%",
          color: "#fff",
          transform: "translateX(-50%)",
          fontWeight: 700,
          opacity: 0.5,
        }}
        href="https://github.com/Jonas-eng-21"
        target="_blank"
      >
        Pen by Jonas Soares
      </a>
    </>
  );
}
