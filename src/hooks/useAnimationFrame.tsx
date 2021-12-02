import React, { useCallback, useEffect } from "react";

export const useAnimationFrame = (cb: (dt: number) => void) => {
  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number>(0);

  const animate = useCallback(
    (time: number) => {
      const dt = (time - previousTimeRef.current) / 1000;
      cb(dt);
      requestRef.current = requestAnimationFrame(animate);
      previousTimeRef.current = time;
    },
    [cb],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

export default useAnimationFrame;
