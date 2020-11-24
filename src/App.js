import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";

const App = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editor = useRef(null);

  const onChangeEditor = (newEditorState) => {
     setEditorState(newEditorState);
     console.log(newEditorState);
  };

  return (
    <Editor
      ref={editor}
      editorState={editorState}
      plugins={[]}
      onChange={onChangeEditor}
    />
  );
};

export default App;