import layout from "./components/layout/layout.component";
import toolbar from "./components/toolbar/toolbar.component";

import angular from "angular";
import routes from "./layout.routes";
import commons from "../commons/commons.module";

export default angular.module('layout', [commons])
    .component(layout.$name, layout)
    .component(toolbar.$name, toolbar)
    .config(routes).name;