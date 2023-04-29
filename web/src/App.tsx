import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import ListdragQueens from './pages/DragQueens/listDragQueens';
import AddDragQueen from './pages/DragQueens/addDragQueen';

export default function App() {
  
  return (
    <>
      <p>Hello World!</p>
    
      <div className="app">
        <main> 
          <Router>
            <Routes>
              <Route path="/dragQueens" element={<ListdragQueens/>} />
              <Route path="/dragQueens/create" element={<AddDragQueen/>} />
              <Route path="/" element={<h1>Home</h1>} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}
