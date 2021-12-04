import React from "react";

import "./UI.scss";
import { EntityManager } from "@yoieh/ecs-core";
import { PauseCommandComponent } from "../../ecs/components/PauseCommandComponent";
import { PlayCommandComponent } from "../../ecs/components/PlayCommandComponent";

const pause = () => {
  const entity = EntityManager.instance.createEntity();
  entity.addComponent(new PauseCommandComponent());
};

const play = () => {
  const entity = EntityManager.instance.createEntity();
  entity.addComponent(new PlayCommandComponent());
};

export const UITop = function () {
  const [isPaused, setPaused] = React.useState(false);

  return (
    <div className="ui top">
      <div>left</div>
      <div>
        <button type="button">clear</button>
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
        <button type="button">step</button>
      </div>
      <div>right</div>
    </div>
  );
};

export default UITop;
