import React from 'react';
import customCss from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <p className={customCss.errorText}>{message}</p>
  );
};

export default ErrorMessage;