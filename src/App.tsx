import React, { useCallback, useEffect, useMemo, useState } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Canvas } from "./Display/Canvas";
import Grid from "./Grid/Grid";
import { UIBottom } from "./UI/UIBottom";
import { UITop } from "./UI/UITop";
import { useEngineRef } from "./hooks/useEngineRef";
import Engine from "./Engine/Engine";
import { IEntity } from "./Engine/IEntity";
import EntityManager from "./Engine/EntityManager";

const useEntities = (engine: Engine) => {
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [entityCount, setEntityCount] = useState<number>(0);

  if (engine && !engine.EntityManager) {
    console.log("No EntityManager");
    engine?.setEntityManager(new EntityManager());
  }

  const { EntityManager: entityManager } = engine;

  const addEntity = useCallback(
    (entity: IEntity) => {
      if (entityManager) {
        setEntities([...entities, entity]);
        setEntityCount(entityCount + 1);

        console.log("HERE; ", engine?.EntityManager);

        entityManager?.addEntity(entity);
      }
    },
    [engine?.EntityManager, entities, entityCount, entityManager],
  );

  const removeEntity = useCallback(
    (entity: IEntity) => {
      if (entityManager) {
        setEntities(entities.filter((e) => e !== entity));
        setEntityCount(entityCount - 1);

        entityManager?.removeEntity(entity);
      }
    },
    [entities, entityCount, entityManager],
  );

  return { entities, addEntity, removeEntity, entityCount };
};

const App: React.FC = function () {
  const { createEngine, engine } = useEngineRef();

  const entityManager = useEntities(engine);

  const grid = useMemo<Grid<boolean>>(() => {
    const testGrid = new Grid<boolean>(100, 100, 10);

    testGrid.generate();

    return testGrid;
  }, []);

  useEffect(() => {
    if (entityManager?.entities.length <= 0) {
      console.log("Creating entities");
      entityManager.addEntity(grid);

      // for (let index = 0; index < 10; index += 1) {
      //   grid.getRandomCell()?.setValue(true);
      // }
    }
  }, [grid, entityManager]);

  return (
    <div className="App">
      <Canvas setRef={createEngine} engine={engine} {...{ grid }} />

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
