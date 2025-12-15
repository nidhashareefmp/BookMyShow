import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats" element={<SeatSelection />} />
      </Routes>
    </>
  );
}

export default App;
