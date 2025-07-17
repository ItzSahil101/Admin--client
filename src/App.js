import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrderPage from "./components/OrderPage";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
         <Route path="/" element={<Main/>} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
