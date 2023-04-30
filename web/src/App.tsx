import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeaponsGenshin from "./WeaponsGenshin";
import Home from "./Home";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/WeaponsGenshin' element={ <WeaponsGenshin/> }/>
      </Routes>
    </Router>
  );
}