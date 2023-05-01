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
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function fetchAnimais() {
      const response = await axios.get<Animal[]>(import.meta.env.VITE_API_URL+'/animais');
      setAnimais(response.data);
    }

    fetchAnimais();
  }, []);

  const animaisFiltrados = animais.filter(animal => {
    return (
      animal.nome.toLowerCase().includes(busca.toLowerCase()) ||
      animal.especie.toLowerCase().includes(busca.toLowerCase()) ||
      animal.idade.toString().includes(busca.toLowerCase())
    )
  })

  return (
    <div>
      <h1>Lista de Animais</h1>
      <input type="text" placeholder="Buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
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