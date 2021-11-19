import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Canvas } from "./Canvas";

function UITop() {
  return (
    <div className="ui top">
      <div>left</div>
      <div>
        <button>back</button>
        <button>play</button>
        <button>pause</button>
        <button>step</button>
      </div>
      <div>right</div>
    </div>
  );
}

function UIBottom() {
  return <div className="ui bottom">TEST UI</div>;
}

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
