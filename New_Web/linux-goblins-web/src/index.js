import * as React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

const theme = extendTheme({
  colors: {
    lightblue: {
      50: "#4ddbff",
      100: "#4ddbff",
      500: "#4ddbff"
    },
  },
});

ReactDom.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);