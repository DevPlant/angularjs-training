export default class BooksController {

    constructor(BooksService) {
        this.BooksService = BooksService;
        this.books = [];

    }

    $onInit() {
        this.BooksService.getBooks().then((books) => {
            this.books = books;
        });
    }

    static get $inject() {
        return ['BooksService'];
    }

}
