import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./TextArea.style.css";
import { TEXT_EDITOR_KEY } from "../../../utils/constants.js";
import { tinymceTextAreaFormatter } from "../../../utils/utils";
import Tooltip from "../../tooltip/Tooltip.jsx";
import Icon from "../../ui/Icon.jsx";

const TextArea = (props) => {
  const {
    initText = "",
    setText,
    label = "",
    disabled = false,
    tooltip = "",
  } = props;
  const editorRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [valid, setValid] = useState(true);

  const styledClassName = [
    "text-area__styled",
    focus ? "text-area__styled--focus" : "",
    !valid ? "text-area__styled--invalid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="text-area__label-box">
        {tooltip.length > 0 ? (
          <Tooltip tooltipContent={tooltip}>
            <div className="text-area__label" id="description-label">
              {` ${label} `}
              <Icon icon="tooltip" />
            </div>
          </Tooltip>
        ) : (
          <div className="text-area__label" id="description-label">{` ${label} `}</div>
        )}
      </div>
      <div className={styledClassName}>
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
              "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; }",
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
      </div>
    </>
  );
};

export default TextArea;
