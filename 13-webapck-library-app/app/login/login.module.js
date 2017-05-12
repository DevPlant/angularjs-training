import login from "./components/login.component";
import angular from "angular";
import routes from "./login.routes";

export default angular.module('loginModule', [])
    .component(login.$name, login).config(routes).name;