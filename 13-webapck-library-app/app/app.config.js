themeConfiguration.$inject = ['$mdThemingProvider'];
function themeConfiguration($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('light-green').warnPalette('blue-grey');

}

export default themeConfiguration;


