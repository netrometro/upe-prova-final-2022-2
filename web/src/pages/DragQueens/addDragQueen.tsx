'use client';
import { api } from "../../api/axios";
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style.css';


interface DragQueens {
  id: number;
  name: string;
  season: number;
  winner: boolean;
  info?: string;
}

export function AddDragQueen() {

  const navigate = useNavigate();

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
    <div className='tela'>
      <form onSubmit={createDragQueen} className='form'>
        <h1 className='title'>Cadastrar Drag Queen</h1>
        <br />
        <div className='body-queens'>
          <div >
            <label htmlFor="name" className='label-queens'> Nome:</label>
            <br/>
            <input type="text" name="name" id="name" className='input-queens' onChange={event => setDragQueenName(event.target.value)} value={DragQueenName} required />
          </div>
          <div >
            <label htmlFor="season" className='label-queens'>Temporada:</label>
            <select name="season" className='input-queens' id="season" onChange={event => setDragQueenSeason(Number(event.target.value))} value={DragQueenSeason}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>
          <div >
            <label htmlFor="winner" className='label-queens'>Venceu Rupaul's Drag Race?</label>
            <select name="winner" className='input-queens' id="winner" onChange={event => setDragQueenWinner(Boolean(event.target.value))} value={DragQueenWinner.toString()}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div >
            <label htmlFor="info" className='label-queens'>Info:</label>
            <textarea name="info" className='input-queens' id="info" value={DragQueenInfo} onChange={event =>setDragQueenInfo( event.target.value)}></textarea>
          </div>
          <br />
          <br />
          <div className='button-group'>
            <button type="submit" className='button-green'>Cadastrar</button>
            <button type="button" className='button-blue' onClick={() => navigate( '/dragQueens')}>Voltar</button>
          </div>
        </div>
      </form>

    </div>
  )
}


export default AddDragQueen;