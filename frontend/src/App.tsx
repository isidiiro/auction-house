import Navbar from "./components/Navbar"
import {Routes ,Route} from "react-router-dom"
import AuctionItems from "./components/AuctionItems"


function App() {
  return (
    <div>
      <Navbar />
      <AuctionItems />
      {/* <Routes>
        <Route path="/" element={ <AuctionItems/>} />
      </Routes> */}
    </div>
  );
}

export default App;
