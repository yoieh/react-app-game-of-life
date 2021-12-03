import React, { useCallback, useEffect } from "react";

export const useRecursiveTimeout = (
  cb: (dt: number) => void,
  delay: number,
) => {
  const requestRef = React.useRef<ReturnType<typeof setTimeout>>();

  const previousTimeRef = React.useRef<number>(0);

  const timeout = useCallback(() => {
    const time = Date.now();
    const dt = time - previousTimeRef.current;
    cb(dt);
    requestRef.current = setTimeout(timeout, delay);
    previousTimeRef.current = time;
  }, [cb, delay]);

  useEffect(() => {
    requestRef.current = setTimeout(timeout, delay);
    return () => requestRef.current && clearTimeout(requestRef.current);
  }, [delay, timeout]);
};

export default useRecursiveTimeout;
