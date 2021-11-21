import EntityManager from "./EntityManager";

class Engine {
  private canvas: any;

  get ctx() {
    return this.canvas.getContext("2d");
  }

  get Width() {
    return this.canvas.width;
  }

  set Width(width: number) {
    this.canvas.width = width;
  }

  get Height() {
    return this.canvas.height;
  }

  set Height(height: number) {
    this.canvas.height = height;
  }

  private time: number;

  private lastTime: number;

  private deltaTime: number;

  private fps: number;

  private fpsCounter: number;

  private fpsInterval: number;

  private fpsLastInterval: number;

  private fpsLastTime: number;

  public EntityManager: EntityManager = new EntityManager();

  constructor() {
    // this.collisionManager = new CollisionManager(this);
    // this.inputManager = new InputManager(this);
    // this.camera = new Camera(this);
    this.time = 0;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.fps = 0;
    this.fpsCounter = 0;
    this.fpsInterval = 1000;
    this.fpsLastInterval = 0;
    this.fpsLastTime = 0;
    this.fpsCounter = 0;
  }

  public update() {
    this.time = Date.now();
    this.deltaTime = this.time - this.lastTime;
    this.lastTime = this.time;
    this.fpsCounter += this.deltaTime;
    if (this.fpsCounter >= this.fpsInterval) {
      this.fps = (1 / this.deltaTime) * this.fpsInterval; // this.fpsCounter / (this.time - this.fpsLastTime);
      this.fpsCounter = 0;
      this.fpsLastTime = this.time;
      this.fpsLastInterval = this.fpsInterval;
    }

    this.EntityManager?.getEntities().forEach((entity) => {
      entity.update(this.deltaTime);
    });
  }

  public render() {
    this.canvas.width = this.Width;
    this.canvas.height = this.Height;

    this.ctx.clearRect(0, 0, this.Width, this.Height);
    this.EntityManager?.getEntities().forEach((entity) => {
      entity.render(this.ctx);
    });
  }

  public start() {
    console.log("Engine started");
    this.lastTime = Date.now();
    this.fpsLastTime = Date.now();
    this.loop();
  }

  private loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  public setEntityManager(entityManager: EntityManager) {
    console.log("EntityManager set");
    this.EntityManager = entityManager;
  }

  public getCanvas() {
    return this.canvas;
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public getTime() {
    return this.time;
  }

  public getDeltaTime() {
    return this.deltaTime;
  }

  public getFps() {
    return this.fps;
  }

  public getFpsInterval() {
    return this.fpsInterval;
  }

  public getFpsLastTime() {
    return this.fpsLastTime;
  }

  public getFpsCounter() {
    return this.fpsCounter;
  }

  public setTime(time: number) {
    this.time = time;
  }

  public setLastTime(lastTime: number) {
    this.lastTime = lastTime;
  }
}

export default Engine;
