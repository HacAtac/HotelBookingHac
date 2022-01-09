import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Homescreen} />
        <Route path="/room/:roomid" component={Bookingscreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
