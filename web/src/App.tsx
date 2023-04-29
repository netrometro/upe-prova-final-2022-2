import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListdragQueens from './pages/DragQueens/listDragQueens';
import AddDragQueen from './pages/DragQueens/addDragQueen';
import DeleteDragQueen from './pages/DragQueens/deleteDragQueen';
import NavBar from './navBar';
export default function App() {
  
  return (
    <>
      <div className="app">
        <main> 
          <NavBar />
          <Router>
            <Routes>
              <Route path="/dragQueens" element={<ListdragQueens/>} />
              <Route path="/dragQueens/create" element={<AddDragQueen/>} />
              <Route path="/dragQueens/delete/:dragQueenId" element={<DeleteDragQueen/>} />
              <Route path="/" element={<h1>Home</h1>} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}
