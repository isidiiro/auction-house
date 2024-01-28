import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuctionItems from "./components/AuctionComponents/AuctionsContainer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuctionItems />} />
      </Routes>
    </Router>
  );
}

export default App;
