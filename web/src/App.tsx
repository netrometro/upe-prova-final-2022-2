import './App.css'
//import TaskList from './pages/TaskList'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListdragQueens from './pages/DragQueens/listDragQueens';
import AddDragQueen from './pages/DragQueens/addDragQueen';
import Escola from "./Escola";
import Home from "./Home";
import AnimalPag from "./pages/animal/index";
import Filmes from "./pages/Filmes/Filmes";
import ListFilmes from "./pages/Filmes/ListFilmes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeaponsGenshin from "./WeaponsGenshin";
import Home from "./Home";

export default function App() {

// CODIGO COM ERRO:
// Esse trecho de codigo estava impedindo que as outras rotas aparecesse na Home
//  return <div>
//  <h1>Task List</h1>
//  <TaskList />
//</div>

  
  return (
    <>
      <div className="app">
        <main>
          <Router>
            <Routes>
              <Route path="/filmes" element={<Filmes />} />
              <Route path="/ListaFilmes" element={<ListFilmes />} />
              <Route path="/dragQueens" element={<ListdragQueens/>} />
              <Route path="/dragQueens/create" element={<AddDragQueen/>} />
              <Route path='/' element={ <Home /> } />
              <Route path='/escola' element={ <Escola/> }/>
              <Route path='/animal' element={<AnimalPag />} />
              <Route path='/WeaponsGenshin' element={ <WeaponsGenshin/> }/>
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}

