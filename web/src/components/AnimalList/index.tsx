import { useEffect, useState } from 'react';
import axios from 'axios';

type Animal = {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  vacinado: boolean;
};

export default function AnimaisList() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [filtro, setFiltro] = useState<'todos' | 'vacinados' | 'nao-vacinados'>('todos');
  const [pesquisa, setPesquisa] = useState<string>('');

  useEffect(() => {
    async function fetchAnimais() {
      const response = await axios.get<Animal[]>(import.meta.env.VITE_API_URL+'/animais');
      setAnimais(response.data);
    }

    fetchAnimais();
  }, []);

  function filtrarAnimais(animal: Animal) {
    if (filtro === 'todos') {
      return true;
    } else if (filtro === 'vacinados') {
      return animal.vacinado;
    } else if (filtro === 'nao-vacinados') {
      return !animal.vacinado;
    }
  }

  function pesquisarAnimais(animal: Animal) {
    return animal.nome.toLowerCase().includes(pesquisa.toLowerCase()) || 
           animal.especie.toLowerCase().includes(pesquisa.toLowerCase());
  }

  const animaisFiltrados = animais.filter(filtrarAnimais).filter(pesquisarAnimais);

  return (
    <div>
      <h1>Lista de Animais</h1>
      <label>
        Filtro:
        <select value={filtro} onChange={e => setFiltro(e.target.value as 'todos' | 'vacinados' | 'nao-vacinados')}>
          <option value="todos">Todos</option>
          <option value="vacinados">Vacinados</option>
          <option value="nao-vacinados">Não Vacinados</option>
        </select>
      </label>
      <br />
      <label>
        Pesquisar:
        <input type="text" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
      </label>
      <ul>
        {animaisFiltrados.map((animal) => (
          <li key={animal.id}>
            {animal.nome} - {animal.especie} - {animal.idade} anos - {animal.vacinado ? 'Vacinado' : 'Não Vacinado'}
          </li>
        ))}
      </ul>
    </div>
  );
}
