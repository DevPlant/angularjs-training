import angular from "angular";
import BooksService from "./service/books.service";
import BooksComponent from "./books-component/books.component";
import BookRoutes from "./books.routes";

export default angular.module('booksModule', [])
    .service(BooksService.$name, BooksService)
    .component(BooksComponent.$name, BooksComponent)
    .config(BookRoutes)
    .name;

