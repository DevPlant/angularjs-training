import books from "./components/books.component";
import angular from "angular";
import routes from "./books.routes";

export default angular.module('booksModule', [])
    .component(books.$name, books).config(routes).name;