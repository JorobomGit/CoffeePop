angular.module("pelisAngular").service("HtmlStorage", ["$http", "$q", "apiPath", "URL", function($http, $q, apiPath, URL) {

    this.user = null;

    this.saveUser = function(user) {
        console.log("Guardando....", user);
        localStorage.setItem("user", JSON.stringify(user));
    };
    
    this.getUser = function() {
        return JSON.parse(localStorage.getItem("user"));
    };

    this.removeUser = function() {
        localStorage.removeItem("user");
    };
    
}]);
