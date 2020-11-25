import React, { useRef } from "react";
import styled from "styled-components";
import { Editor } from "draft-js";

const Block = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 40px;
`;
const Plus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;  
  font-size: 25px;
  color: lightgray;
  
  &:hover {
    color: gray;
  }
`;
const Wrapper = styled.div`
  flex-grow: 1;
`;

const EditableBlock = ({ state, addEditableBlock, onChangeEditableBlock }) => {
  const editor = useRef(null);

  const onClickBlock = () => {
    editor.current.focus();
  };

  return (
    <Block>
      <Plus onClick={addEditableBlock}>
        +
      </Plus>
      <Wrapper onClick={onClickBlock}>
        <Editor
          ref={editor}
          editorState={state}
          onChange={onChangeEditableBlock}
        />
      </Wrapper>
    </Block>
  );
};

export default EditableBlock;