commonsConfiguration.$inject = ['StorageService'];
function authInterceptor(StorageService) {
    return {
        'request': function (config) {

            const token = StorageService.getToken();

            if(token && !config.headers.Authorization) {
                config.headers.Authorization = "Bearer "+token.access_token;
            }
            return config;
        }

    }
}

commonsConfiguration.$inject = ['$httpProvider'];
function commonsConfiguration($httpProvider) {

    $httpProvider.interceptors.push(authInterceptor);

}


export default commonsConfiguration;