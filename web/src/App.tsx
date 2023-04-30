import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Escola from "./Escola";
import Home from "./Home";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/escola' element={ <Escola/> }/>
      </Routes>
    </Router>
  );
}
