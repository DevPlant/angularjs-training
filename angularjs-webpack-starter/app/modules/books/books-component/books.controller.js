export default class BooksController {

    static get $inject() {
        return ['BooksService'];
    }

    constructor(BooksService) {
        this.BooksService = BooksService;
        this.books = [];
        this.authors = [];
        this.newAuthor = {name: null};

        this.BooksService.getBooks().then((books)=>{
            console.log(books);
            this.books = books;
        });

        this.BooksService.getAuthors().then((authors)=>{
            this.authors = authors;
        });
    }


    createAuthor(){
        this.BooksService.createAuthor(this.newAuthor).then(() =>{
            this.BooksService.getAuthors().then((authors)=>{
                this.authors = authors;
            });
        })
    }

    deleteAuthor(author){
        this.BooksService.deleteAuthor(author.id).then(() =>{
            this.BooksService.getAuthors().then((authors)=>{
                this.authors = authors;
            });
        })
    }

}