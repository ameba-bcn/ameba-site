import React, { useState, Suspense, lazy } from "react";
import "./TextArea.style.css";
import Tooltip from "../../tooltip/Tooltip.jsx";
import Icon from "../../ui/Icon.jsx";
import Spinner from "../../spinner/Spinner.jsx";

const TextAreaEditor = lazy(() => import("./TextAreaEditor.jsx"));

const TextArea = (props) => {
  const {
    initText = "",
    setText,
    label = "",
    disabled = false,
    tooltip = "",
  } = props;
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
      {(label || tooltip.length > 0) && (
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
      )}
      <div className={styledClassName}>
        <Suspense
          fallback={
            <div className="text-area__loading">
              <Spinner size={48} alone />
            </div>
          }
        >
          <TextAreaEditor
            initText={initText}
            setText={setText}
            disabled={disabled}
            setFocus={setFocus}
            setValid={setValid}
          />
        </Suspense>
      </div>
    </>
  );
};

export default TextArea;
