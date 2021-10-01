import React, { useState } from "react";
import ErrorBox from "../error/ErrorBox";
import "./../../../contacte/Contacte.css";
import NewsletterForm from "./NewsletterForm";

function NewsletterFormLayout() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="formNewsGlobal">
      <div className="formLabelNews">newsletter</div>
      {isSubmitted ? (
        <ErrorBox isError={false} />
      ) : (
        <NewsletterForm
          setIsSubmitted={setIsSubmitted}
          isSubmitted
        />
      )}
    </div>
  );
}

export default NewsletterFormLayout;
