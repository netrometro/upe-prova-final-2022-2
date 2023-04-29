'use client';
import react from 'react';
import { api } from "../../api/axios";
import { FormEvent, useState, useEffect } from "react";

interface DragQueens {
  id: number;
  name: string;
  season: number;
  winner: boolean;
  info?: string;
}

export function AddDragQueen() {

  const [DragQueenName, setDragQueenName] = useState('');
  const [DragQueenSeason, setDragQueenSeason] = useState(0);
  const [DragQueenWinner, setDragQueenWinner] = useState(false);
  const [DragQueenInfo, setDragQueenInfo] = useState('');
  const [dragQueen, setDragQueen] = useState<DragQueens[]>([]);


  function createDragQueen(event: FormEvent) {
    event.preventDefault();
    try {

      const response = api.post('/dragQueens/create', {
        name: DragQueenName,
        season: DragQueenSeason,
        winner: DragQueenWinner,
        info: DragQueenInfo,


      });
      alert('Queen cadastrada com sucesso');
      console.log(response);

      setDragQueenName('');
      setDragQueenSeason(0);
      setDragQueenWinner(false);
      setDragQueenInfo('');

    } catch (err) {
      console.log(err);
      alert('Erro ao cadastrar queen');
    }
  }


  return (
    <div>
      <form onSubmit={createDragQueen}>
        <div>
          <label htmlFor="name"> Nome:</label>
          <input type="text" name="name" id="name" onChange={event => setDragQueenName(event.target.value)} value={DragQueenName} required />
        </div>
        <div>
          <label htmlFor="season">Temporada:</label>
          <select name="season" id="season" onChange={event => setDragQueenSeason(Number(event.target.value))} value={DragQueenSeason}>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="winner">Venceu Rupaul's Drag Race?</label>
          <select name="winner" id="winner" onChange={event => setDragQueenWinner(Boolean(event.target.value))} value={DragQueenWinner.toString()}>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <div>
          <label htmlFor="info">Info:</label>
          <textarea name="info" id="info" value={DragQueenInfo} onChange={event =>setDragQueenInfo( event.target.value)}></textarea>
        </div>
        <br />
        <br />
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={() => window.location.href = '/dragQueens'}>Cancelar</button>

      </form>

    </div>
  )
}


export default AddDragQueen;