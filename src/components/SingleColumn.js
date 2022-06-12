import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { findAllDND, patchDND } from "../services/List.service";

export default function Singlecolumn() {
  const [renderedList, setRenderedList] = useState();
  const previousState = useRef();

  useEffect(() => {
    findAllDND()
      .then((response) => setRenderedList(response.data))
      .catch((err) => console.log(err));
  }, []);

  const updateApi = (newArr) => {
    setRenderedList(newArr);

    let onlyId = newArr.map((a) => a._id);
    patchDND(onlyId)
      .then(() => {})
      .catch(() => setRenderedList(previousState.current));
  };

  function handleOnDragEnd(result) {
    const { source, destination } = result;
    //if drop out of a droppable area => dont do anything
    if (!destination) return;

    // if drop at the same index   => dont do anything
    if (source.index === destination.index) return;

    // we save the previous state, in case the API update request fail
    previousState.current = renderedList;

    // update the DNDlist  with the new sequence
    const newArr = Array.from(renderedList);
    const [draggedItem] = newArr.splice(source.index, 1);
    newArr.splice(destination.index, 0, draggedItem);
    updateApi(newArr);
  }

  return (
    <div className="d-flex">
      {renderedList && (
        <div className="dnd">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="renderedList" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {renderedList.map((item, index) => {
                    return (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item && (
                              <div className="item">
                                <p>{item.name}</p>
                                <p>{item._id}</p>
                              </div>
                            )}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}
