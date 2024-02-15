import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./index.css";
import logo from "../../images/logo.png";

export function NavBar() {
  return (
    <body>
      <div class="navbar">
        <a href="/" class="logo">
          <img class="logo" src={logo} alt="" />
        </a>
        {
          <ul class="nav">
            <ButtonGroup spacing="4">
              <li>
                <Button
                  id="start"
   
                >
                  Build A PC
                </Button>
              </li>
              <li>
                <Button
                  id="about"

                >
                  About
                </Button>
              </li>
              <li>
                <Button
                  id="support"
                >
                  Support
                </Button>
              </li>
            </ButtonGroup>
          </ul>
        }
      </div>
    </body>
  );
}