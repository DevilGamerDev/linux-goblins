import React from "react";
import "./Styles/index.css";
import "./Styles/asset1.css";
import logo from "../../images/logo.png";
import { MenuData } from "./MenuData";

export function NavBar() {
  return (
    <body>
      <nav class="navbar">
        <a href="/" class="logo">
          <img class="logo" src={logo} alt="" />
        </a>

        <ul className="nav">
          {MenuData.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url} className={item.cName}>
                  {item.title}
                </a>
              </li>
            );
          })}

        </ul>
        

       </nav>
    </body>
  );
}