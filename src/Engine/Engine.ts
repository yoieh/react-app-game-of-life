import { IEntity } from "./IEntity";

class Engine {
  private canvas: any;

  private ctx: any;

  private width: any;

  private height: any;

  private entities: IEntity[];

  private time: number;

  private lastTime: number;

  private deltaTime: number;

  private fps: number;

  private fpsCounter: number;

  private fpsInterval: number;

  private fpsLastInterval: number;

  private fpsLastTime: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.entities = [];
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
      this.fps = this.fpsCounter / (this.time - this.fpsLastTime);
      this.fpsCounter = 0;
      this.fpsLastTime = this.time;
    }
    this.entities.forEach((entity) => {
      entity.update(this.deltaTime);
    });
  }

  public render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.entities.forEach((entity) => {
      entity.render(this.ctx);
    });
  }

  public start() {
    this.lastTime = Date.now();
    this.fpsLastTime = Date.now();
    this.loop();
  }

  private loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  public addEntity(entity: IEntity) {
    this.entities.push(entity);
  }

  public removeEntity(entity: IEntity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  public getEntities() {
    return this.entities;
  }

  public getCanvas() {
    return this.canvas;
  }

  public getCtx() {
    return this.ctx;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
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

  public setWidth(width: number) {
    this.width = width;
  }

  public setHeight(height: number) {
    this.height = height;
  }
}

export default Engine;
