import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
// import { onAuthStateChanged } from "firebase/auth";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
