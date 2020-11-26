import React, { useState, useRef, useEffect } from "react";
import { Editor } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
import parse from 'html-react-parser';
import styles from "./MomentBlock.module.css";

const EditableBlock = ({ state, dragHandleProps, addEditableBlock, onChangeEditableBlock }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editor = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editor.current.focus();
    }
  }, [isEditing, setIsEditing]);

  const onClickBlock = () => {
    setIsEditing(true);
  };
  const onBlurBlock = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.component}>
      <div className={styles.plus} onClick={addEditableBlock}>
        +
      </div>
      <div className={styles.dots} {...dragHandleProps}>
        ..<br/>
        ..<br/>
        ..<br/>
      </div>
      <div className={styles.wrapper} onClick={onClickBlock}>
        {/*<Editor*/}
        {/*  ref={editor}*/}
        {/*  readOnly={!isEditing}*/}
        {/*  editorState={state}*/}
        {/*  onChange={onChangeEditableBlock}*/}
        {/*  onBlur={onBlurBlock}*/}
        {/*/>*/}
        {isEditing ? <Editor
          ref={editor}
          editorState={state}
          onChange={onChangeEditableBlock}
          onBlur={onBlurBlock}
        /> : <pre>
          {parse(stateToHTML(state.getCurrentContent()))}
        </pre>}
      </div>
    </div>
  );
};

export default EditableBlock;