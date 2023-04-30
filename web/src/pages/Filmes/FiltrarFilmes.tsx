import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function FiltrarFilmes() {
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
        <h1>Pesquise aqui os seus filmes</h1>
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
            />
          </div>
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
