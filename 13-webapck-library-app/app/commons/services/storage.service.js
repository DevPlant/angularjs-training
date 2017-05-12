export default class StorageService {
    static get $name() {
        return 'StorageService';
    }

    static get AUTH_FIELD() {
        return "AUTH";
    }

    static get $inject() {
        return ['$window'];
    }

    constructor($window) {
        this.$window = $window;
    }

    setToken(token){
        this.$window.localStorage.setItem(StorageService.AUTH_FIELD,JSON.stringify(token));
    }

    removeToken(){
        this.$window.localStorage.removeItem(StorageService.AUTH_FIELD);
    }

    getToken(){
        const item = this.$window.localStorage.getItem(StorageService.AUTH_FIELD);
        if(item){
            return JSON.parse(item);
        }
        return null;
    }


}