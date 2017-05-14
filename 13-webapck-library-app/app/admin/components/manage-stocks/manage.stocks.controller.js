export default class ManageStocksController {

    static get $inject() {
        return ['BooksService', '$mdDialog', 'book'];
    }

    constructor(BooksService, $mdDialog, book) {
        this.BooksService = BooksService;
        this.$mdDialog = $mdDialog;
        this.book = book;
        this.BooksService.getStocks(this.book.id).then((stocks) => {
            this.stocks = stocks;
        });

    }

    close(){
        this.$mdDialog.hide();
    }

    stockPickedUp(stock){
        this.BooksService.stockPickedUp(stock).then(()=>{
            stock.pickedUp = true;
        }).catch(()=>{
           console.log('Pickup failed');
        });
    }

    stockReturned(stock){
        this.BooksService.stockReturned(stock).then(()=>{
            let index = this.stocks.indexOf(stock);
            this.stocks.splice(index, 1);
        }).catch(()=>{
            console.log('Pickup failed');
        });
    }

}