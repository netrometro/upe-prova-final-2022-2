//Comentei o useState pois nao estava sendo usado, logo, apresentando erro
//import { useEffect, useState } from "react";
import { useEffect } from "react";
import { api } from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import './style.css';

function DeleteLivro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function deletarLivro() {
      try {
        await api.delete(`/livros/delete/${id}`);
        alert("Livro deletado com sucesso!");
        navigate("/livros");
      } catch (error) {
        console.log(error);
        alert("Erro ao deletar livro.");
      }
    }

    deletarLivro();
  }, [id, navigate]);

  return (
    <div>
      <h1>Deletando livro...</h1>
    </div>
  );
}

export default DeleteLivro;