// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// import Home from "./components/Home/Home";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";

// import { auth } from "./firebase";

// import "./App.css";

// function App() {
//   const [user, setUser] = useState(null);
//   const [signupComplete, setSignupComplete] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         setUser(authUser);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSignupComplete = () => {
//     setSignupComplete(true);
//   };

//   if (user === null) {
//     // Return null or loading indicator until authentication check is complete
//     return null;
//   }

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route
//             path="/signup"
//             element={<Signup onSignupComplete={handleSignupComplete} />}
//           />
//           {signupComplete ? (
//             <Route path="/" element={<Home />} />
//           ) : (
//             <>
//               <Route path="/" element={<Signup />} />
//               <Route path="/login" element={<Login />} />
//             </>
//           )}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import Home from "./components/Home/Home";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
// import { onAuthStateChanged } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in
//         setUser(user);
//       } else {
//         // No user is signed in
//         setUser(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={user ? <Home /> : <Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/signup" /> :" "}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


