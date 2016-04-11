// Defino el módulo moviedb con los [] que son sus dependencias
angular.module("coffeePop", ['ngRoute', 'ngSanitize', 'ngMap', 'URL']).config(['$routeProvider', "paths", function($routeProvider, paths) {
    //Configuro las URLs de la aplicación
    $routeProvider.when(paths.login, {
        templateUrl: 'views/Login.html'
    }).when(paths.account, {
    	controller: 'AccountController',
        templateUrl: 'views/Account.html'
    }).when(paths.coffees, {
    	controller: 'CoffeesController',
        templateUrl: 'views/Coffees.html'
    }).when(paths.coffeeDetail, {
    	controller: 'CoffeeDetailController',
        templateUrl: 'views/CoffeeDetail.html'
    }).when(paths.nearMe, {
    	controller: 'NearMeController',
        templateUrl: 'views/NearMe.html'
    }).when(paths.addCoffee, {
    	controller: 'AddCoffeeController',
        templateUrl: 'views/AddCoffee.html'
    }).when(paths.favs, {
    	controller: 'FavsController',
        templateUrl: 'views/Favs.html'
    }).otherwise({
        templateUrl: 'views/404.html'
    });

}]);