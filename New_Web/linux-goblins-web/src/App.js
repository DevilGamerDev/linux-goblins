import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage, AboutPage, BuildPage, SupportPage } from "./pages";

function App({ Component, pageProps }) {
  return (
    <Routes>
      <Route path="/" exact={true} element={<LandingPage />} />
      <Route path="/about" exact={true} element={<AboutPage />} />
      <Route path="/build" exact={true} element={<BuildPage />} />
      <Route path="/support" exact={true} element={<SupportPage />} />
    </Routes>
  );
}
export default App;