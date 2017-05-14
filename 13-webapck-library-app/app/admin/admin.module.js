import admin from "./components/admin.component";
import angular from "angular";
import routes from "./admin.routes";

export default angular.module('adminModule', [])
    .component(admin.$name, admin).config(routes).name;