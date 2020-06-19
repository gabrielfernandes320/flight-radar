import React from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import "./header.scss";
import { Template } from "devextreme-react/core/template";

export default ({ menuToggleEnabled, title, toggleMenu, userMenuItems }) => (
  <header className={"header-component"}>
    <Toolbar className={"header-toolbar"}></Toolbar>
  </header>
);
