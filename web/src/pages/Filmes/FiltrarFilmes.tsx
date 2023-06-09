import React, { useState } from "react";
import api from "../../api";


interface Filme {
  id: number;
  titulo: string;
  descricao: string;
  duracao: number;
  em_cartaz: boolean;
}


export default function FiltrarFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [busca, setBusca] = useState("");

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await api.get("Filtrarfilmes", { params: { busca } });
      setFilmes(response.data.data);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Por favor, forneça um termo de busca válido.");
        } else if (error.response.status === 404) {
          alert("Não foram encontrados filmes com essa palavra.");
        } else {
          alert("Erro ao buscar filmes.");
        }
      } else if (error.request) {
        alert("Erro de conexão com o servidor.");
      } else {
        alert("Ocorreu um erro inesperado.");
      }
      console.error(error);
    }
    
  }
  

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
        <h1>Pesquise aqui os seus filmes</h1>
        <form onSubmit={handleSearch}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: "2%",
            }}
          >
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
        {filmes.length > 0 ? (
          <table style={{ width: "100%", gap: "10%" }}>
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
        ) : (
          <p>Ainda não há nenhum filme com esse título.</p>
        )}
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
