import React, { useRef } from "react";
import { Editor } from "draft-js";
import styles from "./MomentBlock.module.css";

const EditableBlock = ({ state, dragHandleProps, addEditableBlock, onChangeEditableBlock }) => {
  const editor = useRef(null);

  const onClickBlock = () => {
    editor.current.focus();
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
          editorState={state}
          onChange={onChangeEditableBlock}
        />
      </div>
    </div>
  );
};

export default EditableBlock;