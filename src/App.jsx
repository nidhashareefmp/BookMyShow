import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/payment";
import AuthModal from "./pages/AuthModal";
import Favorites from "./pages/Favorites";
import LatestReleases from "./pages/LatestReleases";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/favourites" element={<Favorites />} />
        <Route path="/latestreleases" element={<LatestReleases />} />


      </Routes>
    </>
  );
}

export default App;
