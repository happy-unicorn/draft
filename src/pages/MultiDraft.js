import React, { useState } from 'react';
import styled from "styled-components";
import EditableBlock from "../components/EditableBlock";
import {convertToRaw, EditorState} from 'draft-js';

const Page = styled.div`
  
`;

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
    console.log(convertToRaw(newState.getCurrentContent()));
  };

  return (
    <Page>
      {editableBlocks.map(({ id, state }, index) => {
        return <EditableBlock
          state={state}
          addEditableBlock={addEditableBlock(index)}
          onChangeEditableBlock={onChangeEditableBlock(index)}
          key={id}
        />;
      })}
    </Page>
  );
};

export default MultiDraft;