import books from "./components/books.component";
import angular from "angular";
import routes from "./books.routes";

export default angular.module('userModule', [])
    .component(books.$name, books).config(routes).name;