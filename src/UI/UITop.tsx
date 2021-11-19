import React from "react";

import "./UI.scss";

export function UITop() {
  return (
    <div className="ui top">
      <div>left</div>
      <div>
        <button>back</button>
        <button>play</button>
        <button>pause</button>
        <button>step</button>
      </div>
      <div>right</div>
    </div>
  );
}
