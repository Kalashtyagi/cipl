import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const QuestionEditor = ({ setConvertedContent }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setEditorState}
      editorStyle={{ border: "1px solid #ccc", height: "100px" }}
    />
  );
};

export default QuestionEditor;
