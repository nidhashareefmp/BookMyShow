// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Movies from './pages/Movies';
import SeatSelection from "./pages/SeatSelection";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/seats" element={<SeatSelection/>} />

      </Routes>
    </Router>
  );
}
export default App;


