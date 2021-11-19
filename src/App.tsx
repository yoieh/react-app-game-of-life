import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Canvas } from "./Canvas";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";

function App() {
  return (
    <div className="App">
      <Canvas></Canvas>

      <UITop></UITop>
      <UIBottom></UIBottom>
    </div>
  );
}

export default App;
