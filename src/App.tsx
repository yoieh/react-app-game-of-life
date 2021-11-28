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
import { GridComponent } from "./ecs/components/GridComponent";
import { GridSystem } from "./ecs/systems/GridSystem";
import { ClearCanvasSystem } from "./ecs/systems/ClearCanvasSystem";
import { ResolveCellPositionSystem } from "./ecs/systems/ResolveCellPositionSystem";

const init = () => {
  const time = EntityManager.instance.createEntity();
  time.add(new TimeComponent());

  const grid = EntityManager.instance.createEntity();
  grid.add(new GridComponent(500, 500, 10));

  // create systems after adding entities
  Engine.instance.createSystem(TimerSystem);
  Engine.instance.createSystem(ClearCanvasSystem);
  Engine.instance.createSystem(GridSystem);
  Engine.instance.createSystem(ResolveCellPositionSystem);
  Engine.instance.createSystem(DrawCellsSystem);
};

const run = (dt: number) => {
  Engine.instance.tick(dt);
};

const App: React.FC = function () {
  useAnimationFrame(run);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <Canvas />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
