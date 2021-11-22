import React, { useCallback, useEffect, useState } from "react";
// import logo from './logo.svg';
import "@/App.css";

import { UIBottom } from "@/UI/UIBottom";
import { UITop } from "@/UI/UITop";
import { Engine } from "@/utils";
import { BaseSystem } from "@/utils/ecs/BaseSystem";

class TestSystem extends BaseSystem {
  public OnUpdate() {
    console.log("TestSystem Update");
  }
}

const App: React.FC = function () {
  const [systemsCount, setSystemsCount] = useState(
    Engine.Instance.Systems.length,
  );

  useEffect(() => {
    new Engine().Awake();

    return () => {
      Engine.Instance.Stop();
    };
  }, []);

  const addSystem = useCallback((): any => {
    // eslint-disable-next-line no-new
    new TestSystem();
    setSystemsCount(Engine.Instance.Systems.length);
  }, []);

  const stopEngine = useCallback(() => {
    Engine.Instance.Stop();
    setSystemsCount(Engine.Instance.Systems.length);
  }, []);

  return (
    <div className="App">
      <div>Diplay asdf</div>

      <button
        onClick={() => {
          addSystem();
        }}
        type="button">
        Create
      </button>

      <button
        onClick={() => {
          stopEngine();
        }}
        type="button">
        Stop
      </button>

      <div>{systemsCount}</div>

      <UITop />
      <UIBottom />
    </div>
  );
};

export default App;
