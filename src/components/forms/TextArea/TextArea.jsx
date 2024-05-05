import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  TextAreaLabel,
  TextAreaLabelBox,
  TextAreaStyled,
} from "./TextArea.style.jsx";
import { TEXT_EDITOR_KEY } from "../../../utils/constants.js";

const TextArea = (props) => {
  const { initText = "", setText, label = "", disabled = false } = props;
  const editorRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [valid, setValid] = useState(true);

  return (
    <>
      <TextAreaLabelBox>
        <TextAreaLabel>{` ${label} `}</TextAreaLabel>
      </TextAreaLabelBox>
      <TextAreaStyled focus={focus} valid={valid}>
        <Editor
          apiKey={TEXT_EDITOR_KEY}
          disabled={disabled}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={`<p>${initText}</p>`}
          onEditorChange={(newValue) => {
            setText(newValue);
            if (newValue.length <= 0) setValid(false);
            else setValid(true);
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
            forceNoPTags: true,
            setup: (editor) => {
              editor.on("focus", function () {
                setFocus(true);
              });
              editor.on("blur", function () {
                setFocus(false);
              });
            },
          }}
        />
      </TextAreaStyled>
    </>
  );
};

export default TextArea;
