import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/payment";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment/> } />

      </Routes>
    </>
  );
}

export default App;
