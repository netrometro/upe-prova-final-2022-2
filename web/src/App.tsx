import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListdragQueens from "./pages/DragQueens/listDragQueens";
import AddDragQueen from "./pages/DragQueens/addDragQueen";
import Escola from "./Escola";
import Home from "./Home";
import Filmes from "./Filmes";
import ListFilmes from "./ListFilmes";

export default function App() {
  return (
    <>
      <div className="app">
        <main>
          <Router>
            <Routes>
              <Route path="/filmes" element={<Filmes />} />
              <Route path="/ListaFilmes" element={<ListFilmes />} />
              <Route path="/dragQueens" element={<ListdragQueens />} />
              <Route path="/dragQueens/create" element={<AddDragQueen />} />
              <Route path="/" element={<Home />} />
              <Route path="/escola" element={<Escola />} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}
