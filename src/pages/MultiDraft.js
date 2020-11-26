import React, { useState } from 'react';
import styled from "styled-components";
import { EditorState } from 'draft-js';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditableBlock from "../components/EditableBlock";

const Page = styled.div``;
const Wrapper = styled.div``;

const MultiDraft = () => {
  const [editableBlocks, setEditableBlocks] = useState([{
    id: Date.now(),
    state: EditorState.createEmpty()
  }]);

  const addEditableBlock = (index) => () => {
    setEditableBlocks((prevEditableBlocks) => {
      const newBlock = {
        id: Date.now(),
        state: EditorState.createEmpty()
      };
      return [...prevEditableBlocks.slice(0, index + 1), newBlock, ...prevEditableBlocks.slice(index + 1)];
    });
  };
  const onChangeEditableBlock = (index) => (newState) => {
    setEditableBlocks((prevEditableBlocks) => {
      prevEditableBlocks[index].state = newState;
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
            <Page
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {editableBlocks.map(({ id, state }, index) => {
                return (
                  <Draggable draggableId={String(id)} index={index} key={id}>
                    {(provided) => (
                      <Wrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <EditableBlock
                          state={state}
                          dragHandleProps={provided.dragHandleProps}
                          addEditableBlock={addEditableBlock(index)}
                          onChangeEditableBlock={onChangeEditableBlock(index)}
                        />
                      </Wrapper>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Page>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default MultiDraft;