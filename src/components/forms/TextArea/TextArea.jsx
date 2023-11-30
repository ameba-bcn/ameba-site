import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  TextAreaLabel,
  TextAreaLabelBox,
  TextAreaStyled,
} from "./TextArea.style.jsx";
import { TEXT_EDITOR_KEY } from "../../../utils/constants.js";

const TextArea = (props) => {
  const { initText = "", setText, label = "" } = props;
  const editorRef = useRef(null);

  return (
    <>
      <TextAreaLabelBox>
        <TextAreaLabel>{` ${label} `}</TextAreaLabel>
      </TextAreaLabelBox>
      <TextAreaStyled>
        <Editor
          apiKey={TEXT_EDITOR_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`<p>${initText}</p>`}
          onEditorChange={(newValue) => {
            setText(newValue);
          }}
          init={{
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "autoresize",
            ],
            width: "100%",
            height: 400,
            autoresize_min_height: 400,
            autoresize_max_height: 800,
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; }",
            statusbar: false,
            toolbar_location: "bottom",
          }}
        />
        {/* <button onClick={log}>Log editor content</button> */}
      </TextAreaStyled>
    </>
  );
};

export default TextArea;
