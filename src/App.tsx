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
import { ResolveCellActivationSystem } from "./ecs/systems/ResolveCellActivationSystem";
import { ResolveCellDeActivationSystem } from "./ecs/systems/ResolveCellDeActivationSystem";
import { SimpleAutomataSystem } from "./ecs/systems/SimpleAutomataSystem";
import { useRecursiveTimeout } from "./hooks/useRecursiveTimeout";

const init = () => {
  const time = EntityManager.instance.createEntity();
  time.add(new TimeComponent());

  const grid = EntityManager.instance.createEntity();
  grid.add(new GridComponent(500, 500, 10));

  // create systems after adding entities
  Engine.instance.createSystem(TimerSystem);
  Engine.instance.createSystem(ClearCanvasSystem);
  Engine.instance.createSystem(GridSystem);

  Engine.instance.createSystem(ResolveCellActivationSystem);
  Engine.instance.createSystem(ResolveCellDeActivationSystem);

  Engine.instance.createSystem(SimpleAutomataSystem);

  Engine.instance.createSystem(DrawCellsSystem);
};

const run = (dt: number) => {
  Engine.instance.tick(dt);
};

const render = () => {
  Engine.instance.render();
};

const App: React.FC = function () {
  useRecursiveTimeout(run, 0);
  useAnimationFrame(render);

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
