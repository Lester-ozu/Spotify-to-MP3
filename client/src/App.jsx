import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import Callback from './pages/Callback.jsx';
import Homepage from './pages/Homepage.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/callback" element={<Callback />}/>
          <Route path="/homepage" element={<Homepage />}/>
          <Route path="/" element={<Login />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App