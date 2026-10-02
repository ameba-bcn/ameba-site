import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { TEXT_EDITOR_KEY } from "../../../utils/constants.js";
import { tinymceTextAreaFormatter } from "../../../utils/utils";

// Aislado en su propio chunk: el wrapper de TinyMCE y el script del CDN solo
// se cargan cuando el editor entra en pantalla, no al abrir el compte.
const TextAreaEditor = ({ initText, setText, disabled, setFocus, setValid }) => {
  const editorRef = React.useRef(null);

  return (
    <Editor
      apiKey={TEXT_EDITOR_KEY}
      disabled={disabled}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={initText || ""}
      onEditorChange={(newValue) => {
        setText(tinymceTextAreaFormatter(newValue));
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
          "body { font-family:'Montserrat',Arial,sans-serif; font-size:16px; color:#1d1d1b; }",
        statusbar: false,
        toolbar_location: "bottom",
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
  );
};

export default TextAreaEditor;
