import { useMediaQuery } from "@material-ui/core";
import React, { useState } from "react";
import TitleSection from "../TitleSection";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

export default function QuestionsSection(props) {
  const { interview = {} } = props;
  const breakpoint = useMediaQuery("(min-width:820px)");

  const [expand, setExpand] = useState({
    p: [false, false, false, false, false],
  });

  const updateExpand = (i) => {
    const newIds = expand.p.slice();
    newIds[i] = !newIds[i];
    setExpand({ p: newIds });
  };

  return (
    <div className="entrevista-gral">
      <TitleSection title="Entrevista" />
      <div className="entrevista-columnes">
        {breakpoint ? (
          <>
            <div className="col1-preguntes">
              {interview.current_answers?.map((f, i) =>
                i < 3 ? (
                  <div
                    className="pregunta"
                    key={i}
                    onClick={() => updateExpand(i)}
                  >
                    {f.question}
                    {expand.p[i] ? (
                      <IndeterminateCheckBoxIcon
                        className="collapse-resp"
                        // onClick={() => updateExpand(i)}
                      />
                    ) : (
                      <AddBoxIcon
                        className="expand-resp"
                        // onClick={() => updateExpand(i)}
                      />
                    )}
                    {expand.p[i] ? (
                      <div className={"resposta"}>{f.answer}</div>
                    ) : null}
                    <hr className="hr-section" />
                  </div>
                ) : null
              )}
            </div>
            <div className="col2-preguntes">
              {interview.current_answers?.map((f, i) =>
                i > 2 ? (
                  <div
                    className="pregunta"
                    key={i}
                    onClick={() => updateExpand(i)}
                  >
                    {f.question}
                    {expand.p[i] ? (
                      <IndeterminateCheckBoxIcon
                        className="collapse-resp"
                        // onClick={() => updateExpand(i)}
                      />
                    ) : (
                      <AddBoxIcon
                        className="expand-resp"
                        // onClick={() => updateExpand(i)}
                      />
                    )}
                    {expand.p[i] ? (
                      <div className={"resposta"}>{f.answer}</div>
                    ) : null}
                    <hr className="hr-section" />
                  </div>
                ) : null
              )}
            </div>
          </>
        ) : (
          <>
            {interview.current_answers?.map((f, i) => (
              <div className="pregunta" key={i} onClick={() => updateExpand(i)}>
                {f.question}
                {expand.p[i] ? (
                  <IndeterminateCheckBoxIcon
                    className="collapse-resp"
                    // onClick={() => updateExpand(i)}
                  />
                ) : (
                  <AddBoxIcon
                    className="expand-resp"
                    // onClick={() => updateExpand(i)}
                  />
                )}
                {expand.p[i] ? (
                  <div className={"resposta"}>{f.answer}</div>
                ) : null}
                <hr className="hr-section" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
