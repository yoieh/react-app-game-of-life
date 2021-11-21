import Engine from "../Engine/Engine";

export const reziseCanvas = (engine: Engine) => {
  engine.Width = window.innerWidth;
  engine.Height = window.innerHeight;
};

export default reziseCanvas;
