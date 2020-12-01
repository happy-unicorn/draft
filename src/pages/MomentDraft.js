import React, {useState} from 'react';
import { convertFromRaw, EditorState } from "draft-js";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';
import MomentBlock from "../components/MomentBlock";


const rawContent = (type) => {
  return {
    blocks: [
      {
        text: (
          ""
        ),
        type: type,
        entityRanges: [{offset: 0, length: 0, key: 'first'}],
      },
    ],
    entityMap: {
      first: {
        type: type,
        mutability: 'MUTABLE',
      },
    },
  }
};

const MomentDraft = () => {
  const blocks = (type="text") => convertFromRaw(rawContent(type))
  const [editableBlocks, setEditableBlocks] = useState([{
    id: uuid(),
    state: EditorState.createWithContent(blocks()),
    type: "text"
  }]);

  const addEditableBlock = (id, type) => {
    setEditableBlocks((prevEditableBlocks) => {
      const index = prevEditableBlocks.findIndex(block => block.id === id);
      const newBlock = {
        id: uuid(),
        state: EditorState.createWithContent(blocks(type)),
        type
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
              {editableBlocks.map(({id, state, type}, index) => {
                return (
                  <Draggable draggableId={String(id)} index={index} key={id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <MomentBlock
                          type={type}
                          state={state}
                          dragHandleProps={provided.dragHandleProps}
                          addEditableBlock={(type)=>addEditableBlock(id, type)}
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
