import React from "react";
import Routes from "./routes";
import { CssBaseline } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

function App() {
  return (
    <>
      <CssBaseline />
      <Routes />
    </>
  );
}

export default App;
