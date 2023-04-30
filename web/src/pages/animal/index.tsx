import React, { useState } from 'react';
import AnimaisList from '../../components/AnimalList/index';
import axios from 'axios';

type Animal = {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  vacinado: boolean;
};

function AnimalPag() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [vacinado, setVacinado] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const animal: Animal = {
      id: 0, // será gerado pelo servidor
      nome,
      especie,
      idade: parseInt(idade, 10),
      vacinado,
    };
    await axios.post(import.meta.env.VITE_API_URL+'/animais', animal);
    setNome('');
    setEspecie('');
    setIdade('');
    setVacinado(false);
  };

  return (
    <div>
      <h1>Adicionar Animal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="especie">Espécie:</label>
          <input
            type="text"
            id="especie"
            value={especie}
            onChange={(event) => setEspecie(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input
            type="text"
            id="idade"
            value={idade}
            onChange={(event) => setIdade(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="vacinado">Vacinado:</label>
          <input
            type="checkbox"
            id="vacinado"
            checked={vacinado}
            onChange={(event) => setVacinado(event.target.checked)}
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      <div>
        <AnimaisList />
      </div>
    </div>
  );
}

export default AnimalPag;


