import "./app.css";
import "angular-material/angular-material.css";
import angular from "angular";
import ngMaterial from "angular-material";
import uirouter from "@uirouter/angularjs";
// Import base modules
import config from "./app.config";
import routes from "./app.routes";
import layoutModule from "./layout/layout.module";
import registerModule from "./register/register.module";
import loginModule from "./login/login.module";
import commonsModule from "./commons/commons.module";
import booksModule from "./books/books.module";


export default angular.module('devplant', [ngMaterial, uirouter, commonsModule, layoutModule, registerModule, loginModule, booksModule])
    .config(config).config(routes).name;
