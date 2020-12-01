import React, { useState, useRef, useEffect } from "react";
import { Editor, DefaultDraftBlockRenderMap } from "draft-js";
import Immutable from 'immutable';
import styles from "./MomentBlock.module.css";
import "./MomentBlock.css";
import 'draft-js/dist/Draft.css'
// import * as Draft from "draft-js";


const MomentBlock = ({ state, dragHandleProps, addEditableBlock, deleteEditableBlock, onChangeEditableBlock, type }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const myBlockStyleFn = (contentBlock) => {

    const type = contentBlock.getType();
    if (type === 'bullet') {
      return 'bullet';
    }
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }
  const typeFormater = {
    "text": "Text",
    "bullet": "     Bulleted List",
    "title": "Heading"
  }

  const blockRenderMap = Immutable.Map({
    'title': {
      element: 'h1'
    },
    'bullet': {
      element: 'li'
    },
    'text': {
      element: 'div'
    },

  });

const selectAddEditableBlock = (type) => {
  addEditableBlock(type)
  setIsOpen(false)
}
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

  return (
    <div className={styles.component}>
      <div className={styles.controller} onClick={()=>setIsOpen(true)}>
        +
      </div>
      <div className={`${styles.controller} ${styles.minus}`} onClick={deleteEditableBlock}>
        -
      </div>
      <div className={styles.dots} {...dragHandleProps}>
        ..<br/>
        ..<br/>
        ..<br/>
      </div>
      {isOpen && <div className={styles.dropdown}>
        <div className={styles.dropdown__item} onClick={()=>selectAddEditableBlock("text")}> Text </div>
        <div className={styles.dropdown__item} onClick={()=>selectAddEditableBlock("title")}> Heading </div>
        <div className={styles.dropdown__item} onClick={()=>selectAddEditableBlock("bullet")}> Bulleted list </div>
      </div>}
      <div className={styles.wrapper} onClick={onClickBlock}>
        {/*{isEditing ? */}
          <Editor
            ariaDescribedBy={ `editorDescription`}
            ariaActiveDescendantID={ `editorDescription123`}
          placeholder={typeFormater[type]}
          ref={editor}
          editorState={state}
          onChange={onChangeEditableBlock}
          onBlur={onBlurBlock}
          // customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          blockRenderMap={extendedBlockRenderMap}
          // blockRenderMap={blockRenderMap}

        />
        {/*: <>*/}
        {/*  {parse(stateToHTML(state.getCurrentContent(), {*/}
        {/*    entityStyleFn: blockStyleMapper*/}
        {/*  }))}*/}
        {/*</>}*/}
      </div>
    </div>
  );
};

export default MomentBlock;
