import React, { useState } from "react";
import api from "./services/api";

export default function Filmes() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState("");
  const [emCartaz, setEmCartaz] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await api.post("/filmes", {
        titulo,
        descricao,
        duracao: parseInt(duracao),
        em_cartaz: emCartaz,
      });
      console.log(response.data);
      alert("Filme cadastrado com sucesso!");
    } catch (error) {
      alert("Cadastro de filme não realizado, por favor tentar novamente");
      console.error(error);
    }
  };

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
        <h1>Guarde aqui os seus títulos de filmes</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="duracao">Duração:</label>
            <input
              type="text"
              id="duracao"
              value={duracao}
              onChange={(event) => setDuracao(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="emCartaz">Em cartaz:</label>
            <input
              type="checkbox"
              id="emCartaz"
              checked={emCartaz}
              onChange={(event) => setEmCartaz(event.target.checked)}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
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