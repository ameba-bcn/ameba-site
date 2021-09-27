import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./../../../contacte/Contacte.css";
import NewsletterForm from "./NewsletterForm";

function NewsletterFormLayout() {
  const { message } = useSelector((state) => state.message);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="formNewsGlobal">
      <div className="formLabelNews">newsletter</div>
      {isSubmitted ? (
        message && <div className="msg-new-password-sent">{message}</div>
      ) : (
        <NewsletterForm setIsSubmitted={setIsSubmitted} />
      )}
    </div>
  );
}

export default NewsletterFormLayout;
