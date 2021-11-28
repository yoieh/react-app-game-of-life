/* eslint-disable no-new */
import { Engine, EntityManager } from "@yoieh/ecs-core";
import React, { useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import { TimeComponent } from "./ecs/components/TimeComponent";
import { DrawCellsSystem } from "./ecs/systems/DrawCellsSystem";
import { TimerSystem } from "./ecs/systems/TimerSystem";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";

const init = () => {
  new TimerSystem();
  new DrawCellsSystem();

  const time = EntityManager.instance.createEntity();
  time.add(new TimeComponent());

  EntityManager.instance.addEntity(time);

  const grid = EntityManager.instance.createEntity();
  grid.add(new TimeComponent());
};

const update = (dt: number) => {
  Engine.instance.update(dt);
};

const App: React.FC = function () {
  useEffect(() => {
    init();
  }, []);

  useAnimationFrame(update);

  return (
    <div className="App">
      <Canvas />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
