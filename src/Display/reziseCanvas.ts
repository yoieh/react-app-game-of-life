import Engine from "../Engine/Engine";

export const reziseCanvas = (engine: Engine) => {
  engine.setWidth(window.innerWidth);
  engine.setHeight(window.innerHeight);
};

export default reziseCanvas;
