import React, { useState } from "react";

import { DndContext } from "@dnd-kit/core";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

function DndKitDemo() {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }

  const draggableMarkup = <Draggable>Drag me</Draggable>;
  return (
    <div>
      <h1> Dnd Kit Demo</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>
          <div style={{ padding: "100px", border: "1px solid" }}>
            {isDropped ? draggableMarkup : "Drop here"}
          </div>
        </Droppable>
      </DndContext>
    </div>
  );
}

export default DndKitDemo;
