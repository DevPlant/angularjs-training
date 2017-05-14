import "./books.component.css";
import BooksController from "./books.controller";
import BooksTemplate from "./books.template.html";

export default {
    $name: "books",
    controller: BooksController,
    template: BooksTemplate,
    controllerAs: "booksCtrl"
}
