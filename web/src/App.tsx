import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import Listlivros from './pages/Livros/listLivros';
import AddLivros from './pages/Livros/addLivros';
import DeleteLivro from './pages/Livros/deleteLivro';
import EditLivro from './pages/Livros/putLivro';

export default function App() {
  
  return (
    <>
      <p>Hello World!</p>
    
      <div className="app">
        <main> 
          <Router>
            <Routes>
              <Route path="/livros" element={<Listlivros/>} />
              <Route path="/livros/create" element={<AddLivros/>} />
              <Route path="/livros/delete/:id" element={<DeleteLivro />} />
              <Route path="/livros/:id" element={<EditLivro />} />
              <Route path="/" element={<h1>Home</h1>} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}