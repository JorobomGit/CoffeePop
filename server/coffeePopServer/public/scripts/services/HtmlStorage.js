angular.module("pelisAngular").service("HtmlStorage", ["$http", "$q", "apiPath", "URL", function($http, $q, apiPath, URL) {

    this.user = null;

    this.saveUser = function(username) {
        localStorage.setItem("username", username);
    };
    this.getUser = function() {
        return localStorage.getItem("username");
    };

    this.removeUser = function() {
        localStorage.removeItem("username");
    };
    
}]);
