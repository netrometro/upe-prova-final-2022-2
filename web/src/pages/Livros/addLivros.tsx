'use client';
import { api } from "../../api/axios";
//Comentei o useEffect pois nao estava sendo usado, logo, apresentando erro
//import { FormEvent, useState, useEffect } from "react";
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style.css';

export function AddLivro() {

  const navigate = useNavigate();

  const [LivroTitulo, setLivroTitulo] = useState('');
  const [LivroDescricao, setLivroDescricao] = useState('');
  const [LivroAutor, setLivroAutor] = useState('');
  const [LivroDisponivel, setLivroDisponivel] = useState(false);
  const [LivroQuantidade, setLivroQuantidade] = useState(0);

  function createLivro(event: FormEvent) {
    event.preventDefault();
    try {

      const response = api.post('/livros/create', {
        titulo: LivroTitulo,
        descricao: LivroDescricao,
        autor: LivroAutor,
        quantidade: LivroQuantidade,
        disponivel: LivroDisponivel,
      });
      alert('Livro cadastrado com sucesso');
      console.log(response);

      setLivroTitulo('');
      setLivroDescricao('');
      setLivroAutor('');
      setLivroQuantidade(0)
      setLivroDisponivel(false);

    } catch (err) {
      console.log(err);
      alert('Erro ao cadastrar um livro');
    }
  }

  return (
    <div className='tela'>
      <form onSubmit={createLivro} className='form'>
        <h1 className='title'>Cadastrar Livro</h1>
        <br />
        <div className='body-livros'>
          <div >
            <label htmlFor="titulo" className='label-livros'> Título:</label>
            <br />
            <input type="text" name="titulo" id="titulo" className='input-livros' onChange={event => setLivroTitulo(event.target.value)} value={LivroTitulo} required />
          </div>
          <div >
            <label htmlFor="descricao" className='label-livros'> Descrição:</label>
            <br />
            <input type="text" name="descricao" id="descricao" className='input-livros' onChange={event => setLivroDescricao(event.target.value)} value={LivroDescricao} required />
          </div>
          <div >
            <label htmlFor="autor" className='label-livros'> Autor:</label>
            <br />
            <input type="text" name="autor" id="autor" className='input-livros' onChange={event => setLivroAutor(event.target.value)} value={LivroAutor} required />
          </div>
          <div >
            <label htmlFor="quantidade" className='label-livros'> Quantidade:</label>
            <br />
            <input type="number" name="quantidade" id="quantidade" className='input-livros' onChange={event => setLivroQuantidade(Number(event.target.value))} value={LivroQuantidade} min="0" required />
          </div>
          <div >
            <label htmlFor="disponivel" className='label-livros'>O livro está disponivel?</label>
            <select name="disponivel" className='input-livros' id="disponivel" onChange={event => setLivroDisponivel(Boolean(event.target.value))} value={LivroDisponivel.toString()}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <br />
          <br />
          <div className='button-group'>
            <button type="submit" className='button-green'>Cadastrar</button>
            <button type="button" className='button-blue' onClick={() => navigate('/livros')}>Voltar</button>
          </div>
        </div>
      </form>

    </div>
  )
}


export default AddLivro;