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

  useEffect(() => {
    async function fetchAnimais() {
      const response = await axios.get<Animal[]>('http://localhost:3333/animais');
      setAnimais(response.data);
    }

    fetchAnimais();
  }, []);

  return (
    <div>
      <h1>Lista de Animais</h1>
      <ul>
        {animais.map((animal) => (
          <li key={animal.id}>
            {animal.nome} - {animal.especie} - {animal.idade} anos - {animal.vacinado ? 'Vacinado' : 'Não Vacinado'}
          </li>
        ))}
      </ul>
    </div>
  );
}