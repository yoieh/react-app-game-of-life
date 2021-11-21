import { useCallback, useMemo } from "react";
import Engine from "../Engine/Engine";

export const useEngineRef = () => {
  const engine = useMemo(() => new Engine(), []);

  const createEngine = useCallback(
    (node: HTMLCanvasElement) => {
      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
        engine.setCanvas(node);
        engine.start();
      }
    },
    [engine],
  );

  return { createEngine, engine };
};

export default useEngineRef;
