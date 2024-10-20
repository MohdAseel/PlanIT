import react from "react";
import ReactDOM from "react-dom/client";
import SideBar from "./assets/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Acads from "./Pages/Acads";
import Technical from "./Pages/Technical";
import Cultural from "./Pages/Cultural";
import Sports from "./Pages/Sports";
import Home3DayView from "./Pages/home-3-dayview";

// function App() {
//   return (
//     <Router>
//       <div>
//         <SideBar />

//         <Routes>
//           <Route path="/" element={<Home3DayView />} />
//           <Route path="/Acads" element={<Acads />} />
//           <Route path="/Technical" element={<Technical />} />
//           <Route path="/Cultural" element={<Cultural />} />
//           <Route path="/Sports" element={<Sports />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
function App() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
