import React from "react";
import Routes from "./routes/Routes";
import { CssBaseline } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

export default function App() {
  return (
    <>
      <CssBaseline />
      <Routes />
    </>
  );
}
