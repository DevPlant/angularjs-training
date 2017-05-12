import register from "./components/register.component";
import angular from "angular";
import routes from "./register.routes";

export default angular.module('registerModule', [])
    .component(register.$name, register).config(routes).name;