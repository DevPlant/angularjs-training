import BookStocksController from "./manage-stocks/manage.stocks.controller";
import BookStocksTemplate from "./manage-stocks/manage.stocks.tpl.html";

export default class AdminController {

    static get $inject() {
        return ['BooksService', 'AuthorService', 'UserService', '$mdDialog', '$stateParams', '$state'];
    }

    constructor(BooksService, AuthorService, UserService, $mdDialog, $stateParams, $state) {
        this.BooksService = BooksService;
        this.AuthorService = AuthorService;
        this.UserService = UserService;
        this.$stateParams = $stateParams;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.books = [];
        this.users = [];
        this.authors = [];
        if (!$stateParams.activeTab) {
            this.changeTab('users');
        }

    }

    $onInit() {
        this.BooksService.getAllBooks().then((books) => {
            this.books = books.content;
        });

        this.AuthorService.getAllAuthors().then((authors) => {
            this.authors = authors;
        });

        this.UserService.getAllUsers().then((users) => {
            this.users = users;
        });
    }

    manageBook(book) {
        this.$mdDialog.show({
            controller: BookStocksController,
            controllerAs: 'vm',
            locals: {book: book},
            template: BookStocksTemplate,
            clickOutsideToClose: true
        }).then(()=>{
            this.BooksService.getBook(book.id).then((bookResponse)=>{
                book.numberOfCopies = bookResponse.numberOfCopies;
                book.numberOfRentedCopies = bookResponse.numberOfRentedCopies;
            });
        });
    }

    changeTab(tabName) {
        this.$state.go('.', {activeTab: tabName}, {notify: false});
    }

    addAuthor() {
        this.authors.push({name: null, editable: true});
    }

    addBook() {
        this.books.push({name: null, synopsis: null, year: 2017, editable: true});
    }

    deleteAuthor(author) {
        if (!author.id) {
            let index = this.authors.indexOf(author);
            this.authors.splice(index, 1);
        } else {
            this.AuthorService.deleteAuthor(author.id).then(() => {
                let index = this.authors.indexOf(author);
                this.authors.splice(index, 1);
            }).catch((error) => {
                this.showErrorDialog(error);
            });
        }
    }

    saveOrEditAuthor(author) {
        if (author.editable) {
            if (author.id) {
                this.AuthorService.updateAuthor(author).then(() => {
                    author.editable = false;
                }).catch(() => {
                    this.showErrorDialog(error);
                });
            } else {
                this.AuthorService.createAuthor(author).then((authorResponse) => {
                    author.id = authorResponse.id;
                    author.editable = false;
                }).catch(() => {
                    this.showErrorDialog(error);
                });
            }
        } else {
            author.editable = true;
        }
    }

    showErrorDialog(error) {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Warning')
                .textContent(error.message ? error.message : 'Action Failed!')
                .ok('Ok')
        );
    }

    increaseStock(book) {
        this.BooksService.increaseStock(book.id).then(() => {
            book.numberOfCopies += 1;
        }).catch((error) => {
            this.showErrorDialog(error);
        });
    }

    decreaseStock(book) {
        this.BooksService.decreaseStock(book.id).then(() => {
            book.numberOfCopies -= 1;
        }).catch((error) => {
            this.showErrorDialog(error);
        });
    }

    saveOrEditBook(book) {
        if (book.editable) {
            if (book.id) {
                this.BooksService.updateBook(book).then((bookResponse) => {
                    book.editable = false;
                    book.author = bookResponse.author;
                }).catch((error) => {
                    this.showErrorDialog(error);
                });
            } else {
                this.BooksService.createBook(book).then((bookResponse) => {
                    book.id = bookResponse.id;
                    book.editable = false;
                    book.author = bookResponse.author;
                    book.numberOfCopies = bookResponse.numberOfCopies;
                    book.numberOfRentedCopies = bookResponse.numberOfRentedCopies;
                }).catch((error) => {
                    this.showErrorDialog(error);
                });
            }
        } else {
            book.editable = true;
        }
    }

    deleteBook(book) {
        if (!book.id) {
            let index = this.books.indexOf(book);
            this.books.splice(index, 1);
        } else {
            this.BooksService.deleteBook(book.id).then(() => {
                let index = this.books.indexOf(book);
                this.books.splice(index, 1);
            }).catch((error) => {
                this.showErrorDialog(error);
            });
        }
    }

}
