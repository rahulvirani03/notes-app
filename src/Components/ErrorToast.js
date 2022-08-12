import React from "react";
import { CheckSquare, XSquare } from "react-feather";
import styled from "styled-components";
import { colors } from "../Utils/theme";

const ToastContainer = styled.div`
  .toast {
    height: 2em;
    width: 20vw;
    position: absolute;
    border-radius: 5px;
    top: 0px;
    right: 0px;
    gap: 10px;
    display: flex;
    padding: 0.5em;
    margin: 1em;
    background-color: ${colors.white};
    display: flex;
    align-items: center;
  }
  .slide-in {
    animation: slidein 0.5s;
  }

  .slide-out {
    animation: slideout 0.5s 2.5s;
  }
  .error {
    border-left: 5px solid red;
    color: red;
  }
  .success {
    border-left: 5px solid green;
    color: green;
  }

  @-webkit-keyframes slidein {
    from {
      right: -100px;
      opacity: 0;
    }
    to {
      right: 1px;
      opacity: 1;
    }
  }
  @keyframes slidein {
    from {
      right: -100px;
      opacity: 0;
    }
    to {
      right: 1px;
      opacity: 1;
    }
  }
  @-webkit-keyframes slideout {
    100% {
      right: -100px;
      opacity: 0;
    }
  }
  @keyframes slideout {
    100% {
      right: -100px;
      opacity: 0;
    }
  }
`;
const ErrorToast = ({ toast, toastMessage }) => {
  return (
    <ToastContainer>
      <div
        className={`toast ${toast.active ? "slide-in" : "slide-out"} ${
          toast.type === "Error" ? "error" : "success"
        }`}
      >
        {toast.type === "Error" ? (
          <XSquare color="red" size={15} />
        ) : (
          <CheckSquare color="green" size={15} />
        )}
        {toastMessage}
      </div>
    </ToastContainer>
  );
};

export default ErrorToast;
