import React, { useCallback, useRef } from "react";
import Engine from "../Engine/Engine";

export const useEngineRef = () => {
  const engineRef: React.MutableRefObject<Engine | undefined> =
    useRef<Engine>();

  const createEngine = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      if (!engineRef.current) {
        engineRef.current = new Engine(node);
        engineRef.current.start();
      }
    }
  }, []);

  return { createEngine, engineRef };
};

export default useEngineRef;
