import React from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";

const App: React.FC = function () {
  return (
    <div className="App">
      <Canvas />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
