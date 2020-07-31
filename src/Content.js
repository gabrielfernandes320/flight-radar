import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import appInfo from "./app-info";
import routes from "./app-routes";
import { SideNavInnerToolbar as SideNavBarLayout } from "./layouts";
import { Footer } from "./components";
import { RadarPage } from "./pages";

export default function () {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <RadarPage></RadarPage>
    </SideNavBarLayout>
  );
}
