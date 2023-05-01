import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListdragQueens from './pages/DragQueens/listDragQueens';
import AddDragQueen from './pages/DragQueens/addDragQueen';
import Escola from "./Escola";
import Home from "./Home";
import AnimalPag from "./pages/animal/index";
import Filmes from "./pages/Filmes/Filmes";
import ListFilmes from "./pages/Filmes/ListFilmes";
import FiltrarFilmes from './pages/Filmes/FiltrarFilmes';
import TaskList from './pages/TaskList';
import Listlivros from './pages/Livros/listLivros';
import AddLivros from './pages/Livros/addLivros';
import DeleteLivro from './pages/Livros/deleteLivro';
import EditLivro from './pages/Livros/putLivro';

export default function App() {
  return (
    <>
      <div className="app">
        <main>
          <Router>
            <Routes>
              <Route path="/filmes" element={<Filmes />} />
              <Route path="/ListaFilmes" element={<ListFilmes />} />
              <Route path="/FiltrarFilmes" element={<FiltrarFilmes />} />
              <Route path="/dragQueens" element={<ListdragQueens/>} />
              <Route path="/dragQueens/create" element={<AddDragQueen/>} />
              <Route path='/' element={ <Home /> } />
              <Route path='/escola' element={ <Escola/> }/>
              <Route path='/animal' element={<AnimalPag />} />
              <Route path='/tasks' element ={<TaskList/>}/>
              <Route path="/livros" element={<Listlivros/>} />
              <Route path="/livros/create" element={<AddLivros/>} />
              <Route path="/livros/delete/:id" element={<DeleteLivro/>} />
              <Route path="/livros/:id" element={<EditLivro/>} />
              <Route path="/" element={<h1>Home</h1>} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}

