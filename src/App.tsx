import React from "react";
// import logo from './logo.svg';
import "./App.css";

import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";
import { Engine } from "./utils";

new Engine().Awake();

const App: React.FC = function () {
  return (
    <div className="App">
      <div>Diplay</div>

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
