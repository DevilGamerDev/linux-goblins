import * as React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import { buttonTheme } from './components';

const theme = extendTheme({
  components: { 
      Button: buttonTheme
   },
   colors: {
      brand: {
        50: '#f7fafc',

        500: '#718096',

        900: '#171923',
      }
   }

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