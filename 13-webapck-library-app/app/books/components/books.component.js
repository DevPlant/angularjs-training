import BooksTemplate from "./books.component.tpl.html";
import BooksController from "./books.controller";

export default {
    $name: 'books',
    template: BooksTemplate,
    controllerAs: 'vm',
    controller: BooksController
};

