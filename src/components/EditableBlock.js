import React, { useRef } from "react";
import styled from "styled-components";
import { Editor } from "draft-js";

const Component = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 40px;
  padding: 10px 0;
`;
const Plus = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  width: 30px;  
  padding-right: 10px;
  font-size: 30px;
  color: lightgray;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    color: gray;
  }
`;
const Dots = styled.div`
  padding-top: 1px;
  font-size: 30px;
  line-height: 8px;
  color: lightgray;
  
  &:hover {
    color: gray;
  }
`;
const Wrapper = styled.div`
  flex-grow: 1;
  padding-left: 10px;
`;

const EditableBlock = ({ state, dragHandleProps, addEditableBlock, onChangeEditableBlock }) => {
  const editor = useRef(null);

  const onClickBlock = () => {
    editor.current.focus();
  };

  return (
    <Component>
      <Plus onClick={addEditableBlock}>                 {/* ТАКОЕ ТОЛЬКО НА ЭТАПЕ ПРОТОТИПА! */}
        +
      </Plus>
      <Dots {...dragHandleProps}>                       {/* ТАКОЕ ТОЛЬКО НА ЭТАПЕ ПРОТОТИПА! */}
        ..<br/>
        ..<br/>
        ..<br/>
      </Dots>
      <Wrapper onClick={onClickBlock}>
        <Editor
          ref={editor}
          editorState={state}
          onChange={onChangeEditableBlock}
        />
      </Wrapper>
    </Component>
  );
};

export default EditableBlock;