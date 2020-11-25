import React, { useState, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";
import plugins from "../utils/plugins";

const SingleDraft = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editor = useRef(null);

  const onChangeEditor = (newEditorState) => {
     setEditorState(newEditorState);
     console.log(convertToRaw(newEditorState.getCurrentContent()));
  };

  return (
    <Editor
      ref={editor}
      editorState={editorState}
      plugins={plugins}
      onChange={onChangeEditor}
    />
  );
};

export default SingleDraft;