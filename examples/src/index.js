import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Form from "./Form";
import { DepValueProvider } from "./lib/index";
import FormWithValidate from "./FormWithValidate";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <DepValueProvider>
        <Form />
      </DepValueProvider>
      <br />
      <DepValueProvider>
        <FormWithValidate />
      </DepValueProvider>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
