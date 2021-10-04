import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

import data from "./data";

function App() {
  const [people, setPeople] = useState(data);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);
    const items = Array.from(people);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setPeople(items);
  };

  return (
    <div className="App">
      <h2>Drag and Drop</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="people">
          {(provided) => (
            <ul
              className="section"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {people.map((person, index) => {
                const { id, name, image } = person;
                const sId = index.toString();
                return (
                  <Draggable key={sId} draggableId={sId} index={index}>
                    {(provided) => (
                      <li
                        key={id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="item"
                      >
                        <img src={image} alt={name} />
                        <h3>{name}</h3>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
