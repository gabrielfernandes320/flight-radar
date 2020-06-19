import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SingleCard } from "./layouts";
import {
  LoginForm,
  ResetPasswordForm,
  ChangePasswordForm,
  CreateAccountForm,
} from "./components";

export default function () {
  return <Switch></Switch>;
}
