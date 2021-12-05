import { BaseSystem, IEntity, Query } from "@yoieh/ecs-core";
import { PauseCommandComponent } from "../components/PauseCommandComponent";
import { PlayCommandComponent } from "../components/PlayCommandComponent";
import { SimulationTimeComponent } from "../components/SimulationTimeComponent";
import { SpeedCommandComponent } from "../components/SpeedCommandComponent";

export class SimulationTimerSystem extends BaseSystem {
  public q = new Query((entity: IEntity) =>
    entity.has(SimulationTimeComponent),
  );

  public pausedQ = new Query((entity: IEntity) =>
    entity.has(PauseCommandComponent),
  );

  public playQ = new Query((entity: IEntity) =>
    entity.has(PlayCommandComponent),
  );

  public speedMultiplierQ = new Query((entity: IEntity) =>
    entity.has(SpeedCommandComponent),
  );

  public onCreate(): void {
    const timeEntety = this.entityManager.createEntity();
    timeEntety.addComponent(new SimulationTimeComponent(0));
  }

  public onUpdate(): void {
    this.q.foreach((entity: IEntity) => {
      const timeComponent = entity.get(SimulationTimeComponent);
      const paused = this.pausedQ.find();
      const play = this.playQ.find();

      // alloays keeds speed multiplier updated
      const speed = this.speedMultiplierQ.find();

      if (speed) {
        timeComponent.speedMultiplier = speed
          ? speed.get(SpeedCommandComponent).speedMultiplier
          : 1;
        this.entityManager.removeEntity(speed.id);
      }

      if (paused && !play) return;

      if (paused) {
        this.pausedQ.foreach((pauseEntity: IEntity) => {
          this.entityManager.removeEntity(pauseEntity.id);
        });

        this.playQ.foreach((playEntity: IEntity) => {
          this.entityManager.removeEntity(playEntity.id);
        });
      }

      timeComponent.Value = performance.now();
    });
  }
}

export default SimulationTimerSystem;
