import "./home.style.css";
import HomeController from "./home.controller";

export default {
    $name: 'home',
    template: require('./home.component.tpl.html'),
    controller: HomeController
};
