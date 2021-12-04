import React from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import { useEngine } from "./hooks/useEngine";

import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";

const App: React.FC = function () {
  useEngine();

  return (
    <div className="App">
      <Canvas />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
