import React, { useState } from "react";
import NewsletterForm from "./NewsletterForm";

function NewsletterFormLayout() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="formNewsGlobal">
      <div className="formLabelNews">newsletter</div>
      {isSubmitted ? null : (
        <NewsletterForm setIsSubmitted={setIsSubmitted} isSubmitted />
      )}
    </div>
  );
}

export default NewsletterFormLayout;
