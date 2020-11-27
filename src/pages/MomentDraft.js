import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import MomentBlock from "../components/MomentBlock";

const MomentDraft = () => {
  const [editableBlocks, setEditableBlocks] = useState([{
    id: uuid(),
    state: EditorState.createEmpty()
  }]);

  const addEditableBlock = (id) => () => {
    setEditableBlocks((prevEditableBlocks) => {
      const index = prevEditableBlocks.findIndex(block => block.id === id);
      const newBlock = {
        id: uuid(),
        state: EditorState.createEmpty()
      };
      return [...prevEditableBlocks.slice(0, index + 1), newBlock, ...prevEditableBlocks.slice(index + 1)];
    });
  };
  const deleteEditableBlock = (id) => () => {
    if (editableBlocks.length > 1) {
      setEditableBlocks((prevEditableBlocks) => {
      const index = prevEditableBlocks.findIndex(block => block.id === id);
      return [...prevEditableBlocks.slice(0, index), ...prevEditableBlocks.slice(index + 1)];
    });
    }
  };
  const onChangeEditableBlock = (id) => (newState) => {
    setEditableBlocks((prevEditableBlocks) => {
      const block = prevEditableBlocks.find(block => block.id === id);
      block.state = newState;
      return [...prevEditableBlocks];
    });
  };
  const onDragEnd = (event) => {
    if (!event.destination) {
      return;
    }
    setEditableBlocks((prevEditableBlocks) => {
      const currentEditableBlocks = [...prevEditableBlocks];
      const [current] = currentEditableBlocks.splice(event.source.index, 1);
      currentEditableBlocks.splice(event.destination.index, 0, current);
      return currentEditableBlocks;
    });
  };

  return (
    <>
      Number of blocks: {editableBlocks.length}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {editableBlocks.map(({ id, state }, index) => {
                return (
                  <Draggable draggableId={String(id)} index={index} key={id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <MomentBlock
                          state={state}
                          dragHandleProps={provided.dragHandleProps}
                          addEditableBlock={addEditableBlock(id)}
                          deleteEditableBlock={deleteEditableBlock(id)}
                          onChangeEditableBlock={onChangeEditableBlock(id)}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default MomentDraft;