import React from "react";

import "./UI.scss";

export const UITop = function () {
  return (
    <div className="ui top">
      <div>left</div>
      <div>
        <button type="button">back</button>
        <button type="button">play</button>
        <button type="button">pause</button>
        <button type="button">step</button>
      </div>
      <div>right</div>
    </div>
  );
};

export default UITop;
