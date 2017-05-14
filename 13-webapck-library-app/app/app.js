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
import adminModule from "./admin/admin.module";

export default angular.module('devplant', [ngMaterial, uirouter, commonsModule, layoutModule, registerModule, loginModule, booksModule, adminModule])
    .config(config).config(routes).constant('API_BASE_URL', 'http://178.63.82.71:9010');
