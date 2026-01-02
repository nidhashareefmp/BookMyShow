import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/payment";
import AuthModal from "./pages/AuthModal";
import Favorites from "./pages/Favorites";
import LatestReleases from "./pages/LatestReleases";
import Footer from "./pages/Footer";
import Bookings from "./pages/Bookings";
import ScrollToTop from "./components/ScrollToTop";
import SearchResults from "./pages/SearchResults";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/favourites" element={<Favorites />} />
        <Route path="/latestreleases" element={<LatestReleases />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
