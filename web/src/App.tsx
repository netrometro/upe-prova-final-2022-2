import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListdragQueens from './pages/DragQueens/listDragQueens';
import AddDragQueen from './pages/DragQueens/addDragQueen';
import Escola from "./Escola";
import Home from "./Home";

export default function App() {
  
  return (
    <>
      <div className="app">
        <main> 
          <Router>
            <Routes>
              <Route path="/dragQueens" element={<ListdragQueens/>} />
              <Route path="/dragQueens/create" element={<AddDragQueen/>} />
              <Route path='/' element={ <Home /> } />
              <Route path='/escola' element={ <Escola/> }/>
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}
