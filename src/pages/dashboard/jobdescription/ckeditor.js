import React, { useState, useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name, value, dataResponsibilities }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          value={dataResponsibilities}
          name={name}
          editor={ClassicEditor}
          config={{
            ckfinder: {
              uploadUrl: "",
              autoParagraph: false,
            },
          }}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
            const wordCount = data.split(/\s+/).filter(Boolean).length;
            setIsValid(wordCount >= 100);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}

      {!isValid && (
        <div style={{ color: "red" }}>Minimum 100 words are required !</div>
      )}
    </div>
  );
}

export default Editor;
