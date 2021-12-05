import { useEffect } from "react";
import { EntityManager, Engine } from "@yoieh/ecs-core";
import { GridComponent } from "../ecs/components/GridComponent";
import { TimeComponent } from "../ecs/components/TimeComponent";
import { ClearCanvasSystem } from "../ecs/systems/ClearCanvasSystem";
import { DrawCellsSystem } from "../ecs/systems/DrawCellsSystem";
import { GridSystem } from "../ecs/systems/GridSystem";
import { ResolveCellActivationSystem } from "../ecs/systems/ResolveCellActivationSystem";
import { ResolveCellDeActivationSystem } from "../ecs/systems/ResolveCellDeActivationSystem";
import { SimpleAutomataSystem } from "../ecs/systems/SimpleAutomataSystem";
import { TimerSystem } from "../ecs/systems/TimerSystem";
import { useAnimationFrame } from "./useAnimationFrame";
import { useRecursiveTimeout } from "./useRecursiveTimeout";
import { SimulationTimerSystem } from "../ecs/systems/SimulationTimerSystem";
import { ClearGridSystem } from "../ecs/systems/ClearGridSystem";

const init = () => {
  const time = EntityManager.instance.createEntity();
  time.add(new TimeComponent());

  const grid = EntityManager.instance.createEntity();

  grid.add(new GridComponent(window.innerWidth, window.innerHeight, 10));

  // create systems after adding entities
  Engine.instance.createSystem(TimerSystem);
  Engine.instance.createSystem(SimulationTimerSystem);
  Engine.instance.createSystem(ClearCanvasSystem);
  Engine.instance.createSystem(GridSystem);

  Engine.instance.createSystem(ClearGridSystem);

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

export const useEngine = () => {
  useRecursiveTimeout(run, 0);
  useAnimationFrame(render);

  useEffect(() => {
    init();

    return () => {
      //   Engine.instance.destroy();
      Engine.instance.systems.forEach((system) => {
        Engine.instance.unregisterSystem(system);
      });

      //   EntityManager.instance.destroy();
      EntityManager.instance.entities.forEach((entity) => {
        EntityManager.instance.removeEntity(entity.id);
      });
    };
  }, []);

  return null;
};

export default useEngine;
