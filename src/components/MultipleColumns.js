import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { findAllDNDMultiple, patchDNDmultiple } from "../services/List.service";

export default function MultipleColumns() {
  const initialState = {
    col1: { xxx: [] },
    col2: { xxx: [] },
    col3: { xxx: [] },
  };
  const [lists, setlists] = useState(initialState);
  const previousState = useRef();

  useEffect(() => {
    findAllDNDMultiple()
      .then((response) => {
        const { col1, col2, col3 } = response.data[0];
        setlists({ col1, col2, col3 });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (previousState.current) {
      patchDNDmultiple(lists)
        .then(() => {})
        .catch(() => {
          setlists(previousState.current);
        });
    }
  }, [lists]);

  const onDragEnd = (result, lists, setlists) => {
    const { source, destination } = result;

    //if drop out of a droppable area => dont do anything
    if (!result.destination) return;

    // if drop at the same index & same column  => dont do anything
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    //if drag in other columns
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = lists[source.droppableId];
      const destColumn = lists[destination.droppableId];
      const sourceColumnList = [...sourceColumn.xxx];
      const destinationColumnList = [...destColumn.xxx];
      const [movedElement] = sourceColumnList.splice(source.index, 1);
      destinationColumnList.splice(destination.index, 0, movedElement);

      previousState.current = lists;
      setlists({
        ...lists,
        [source.droppableId]: {
          ...sourceColumn,
          xxx: sourceColumnList,
        },
        [destination.droppableId]: {
          ...destColumn,
          xxx: destinationColumnList,
        },
      });
    } else {
      //if drag in the same column
      const column = lists[source.droppableId];
      const columnList = [...column.xxx];
      const [movedElement] = columnList.splice(source.index, 1);
      columnList.splice(destination.index, 0, movedElement);

      previousState.current = lists;
      setlists({
        ...lists,
        [source.droppableId]: {
          ...column,
          xxx: columnList,
        },
      });
    }
  };

  return (
    <div className="d-flex">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, lists, setlists)}
      >
        {Object.entries(lists).map(([colName, colData]) => {
          return (
            <div key={colName} className="ms-2">
              <>
                <Droppable
                  droppableId={colName}
                  key={colName}
                  direction="vertical"
                  isDropDisabled={colName === "col1" ? true : false}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="droppable"
                        style={{
                          background: snapshot.isDraggingOver ? "red" : "green",
                        }}
                      >
                        <h3>{colName}</h3>
                        {colData.xxx.map((element, index) => {
                          return (
                            <Draggable
                              key={String(element._id)}
                              draggableId={String(element._id)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="draggable"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "yellow"
                                        : "blue",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <p>{element.name}</p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
