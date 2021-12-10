import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Movies />
    </div>
  );
}

export default App;
