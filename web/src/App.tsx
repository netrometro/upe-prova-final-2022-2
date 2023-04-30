import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/animal/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/animal' element={<Home />} />

      </Routes>
    </Router>
  )
}

export default App