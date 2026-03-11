import React, { useState } from "react";
import TitleSection from "../../../../components/layout/TitleSection";
import "./QuestionsSection.css";
import useMediaQuery from "../../../../hooks/use-media-query";
import Icon from "../../../../components/ui/Icon";
import { MOBILE_NORMAL } from "../../../../utils/constants";

export default function QuestionsSection(props) {
  const { interview = {} } = props;
  const breakpoint = useMediaQuery(MOBILE_NORMAL);

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
        {!breakpoint ? (
          <>
            <div className="col1-preguntes">
              {interview.current_answers?.map((f, i) =>
                i < 3 ? (
                  <>
                    <div
                      className="pregunta"
                      key={i}
                      onClick={() => updateExpand(i)}
                    >
                      <div>{f.question}</div>
                      <div className="questions-section__plus-box">
                        {expand.p[i] ? (
                          <Icon
                            icon="minus"
                            type="yellow"
                            height={28}
                            width={28}
                            strokeWidth={2}
                          />
                        ) : (
                          <Icon
                            icon="plus"
                            type="yellow"
                            height={28}
                            width={28}
                            strokeWidth={2}
                          />
                        )}
                      </div>
                    </div>
                    {expand.p[i] ? (
                      <div className={"resposta"}>{f.answer}</div>
                    ) : null}
                    <hr className="hr-section" />
                  </>
                ) : null
              )}
            </div>
            <div className="col2-preguntes">
              {interview.current_answers?.map((f, i) =>
                i > 2 ? (
                  <>
                    <div
                      className="pregunta"
                      key={i}
                      onClick={() => updateExpand(i)}
                    >
                      <div>{f.question}</div>
                      <div className="questions-section__plus-box">
                        {expand.p[i] ? (
                          <Icon
                            icon="minus"
                            type="yellow"
                            height={28}
                            width={28}
                            strokeWidth={2}
                          />
                        ) : (
                          <div className="questions-section__plus-box">
                            <Icon
                              icon="plus"
                              type="yellow"
                              height={28}
                              width={28}
                              strokeWidth={2}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {expand.p[i] ? (
                      <div className={"resposta"}>{f.answer}</div>
                    ) : null}
                    <hr className="hr-section" />
                  </>
                ) : null
              )}
            </div>
          </>
        ) : (
          <>
            {interview.current_answers?.map((f, i) => (
              <>
                <div
                  className="pregunta"
                  key={i}
                  onClick={() => updateExpand(i)}
                >
                  <div>{f.question}</div>
                  <div className="questions-section__plus-box">
                    {expand.p[i] ? (
                      <Icon
                        icon="minus"
                        type="yellow"
                        height={28}
                        width={28}
                        strokeWidth={2}
                      />
                    ) : (
                      <div className="questions-section__plus-box">
                        <Icon
                          icon="plus"
                          type="yellow"
                          height={28}
                          width={28}
                          strokeWidth={2}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {expand.p[i] ? (
                  <div className={"resposta"}>{f.answer}</div>
                ) : null}
                <hr className="hr-section" />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
