import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage, AboutPage } from "./pages";

function App({ Component, pageProps }) {
  return (
    <Routes>
      <Route path="/" exact={true} element={<LandingPage />} />
      <Route path="/about" exact={true} element={<AboutPage />} />
    </Routes>
  );
}
export default App;