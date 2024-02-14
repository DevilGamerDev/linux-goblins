import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages";

function App({ Component, pageProps }) {
  return (
    <Routes>
      <Route path="/" exact={true} element={<LandingPage />} />
    </Routes>
  );
}
export default App;