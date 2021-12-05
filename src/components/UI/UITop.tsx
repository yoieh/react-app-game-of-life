import React from "react";

import "./UI.scss";
import { EntityManager } from "@yoieh/ecs-core";
import { PauseCommandComponent } from "../../ecs/components/PauseCommandComponent";
import { PlayCommandComponent } from "../../ecs/components/PlayCommandComponent";
import { SpeedCommandComponent } from "../../ecs/components/SpeedCommandComponent";
import { ClearGridCommandComponent } from "../../ecs/components/ClearGridCommandComponent";

const pause = () => {
  const entity = EntityManager.instance.createEntity();
  entity.addComponent(new PauseCommandComponent());
};

const play = () => {
  const entity = EntityManager.instance.createEntity();
  entity.addComponent(new PlayCommandComponent());
};

const clear = () => {
  const entity = EntityManager.instance.createEntity();
  entity.addComponent(new ClearGridCommandComponent());
};

export const UITop = function () {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [speedMultiplier, setSpeedMultiplier] = React.useState(1);
  const handelSetSpeedMultiplier = (currentValue: number, value: number) => {
    let newValue = parseFloat((currentValue + value).toFixed(1));

    if (newValue <= 0) {
      newValue = 0.1;
    } else if (newValue > 10) {
      newValue = 10;
    }

    const entity = EntityManager.instance.createEntity();
    entity.addComponent(new SpeedCommandComponent(newValue));

    return newValue;
  };

  const [isPaused, setPaused] = React.useState(false);

  return (
    <div className="ui top">
      <div>left</div>
      <div>
        <button type="button" onClick={clear}>
          clear
        </button>
        {isPaused ? (
          <button
            type="button"
            onClick={() => {
              play();
              setPaused(false);
            }}>
            play
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              pause();
              setPaused(true);
            }}>
            pause
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setSpeedMultiplier((c) => handelSetSpeedMultiplier(c, -1));
          }}>
          {"<<"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSpeedMultiplier((c) => handelSetSpeedMultiplier(c, -0.1));
          }}>
          {"<"}
        </button>
        {speedMultiplier}x{" "}
        <button
          type="button"
          onClick={() => {
            setSpeedMultiplier((c) => handelSetSpeedMultiplier(c, 0.1));
          }}>
          {">"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSpeedMultiplier((c) => handelSetSpeedMultiplier(c, 1));
          }}>
          {">>"}
        </button>
        <small>
          <i>(updates every ~{Math.floor(100 / speedMultiplier)}ms)</i>
        </small>
      </div>
      <div>right</div>
    </div>
  );
};

export default UITop;
