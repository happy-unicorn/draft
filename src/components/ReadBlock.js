import React, { useState, useRef, useEffect } from "react";
import { Editor } from "draft-js";
import styles from "./ReadBlock.module.css";

const ReadBlock = ({ state, dragHandleProps, addEditableBlock, onChangeEditableBlock }) => {
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
        <Editor
          ref={editor}
          readOnly={!isEditing}
          editorState={state}
          onChange={onChangeEditableBlock}
          onBlur={onBlurBlock}
        />
      </div>
    </div>
  );
};

export default ReadBlock;