angular.module("pelisAngular").controller("AppController",

    //Cada vez que queramos utilizar un servicio lo tenemos que inyectar tanto como parametro como
    //en la funcion
    ["$scope", "$window", "$sce", "$location", "HtmlStorage", "paths", "APIClient", function($scope, $window, $sce, $location, HtmlStorage, paths, APIClient) {
        var controller = this;

        controller.titles = {};

        controller.titles[paths.movies] = "Movies List";

        //Model init
        $scope.model = {
            title: ""
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
            console.log("$locationChangeSuccess", $location.path());
            $scope.model.title = controller.titles[$location.path()] || "404 Not Found";
            if ($location.path() == paths.login) {
                $scope.menu = false;
            } else {
                $scope.menu = true;
            }

        });

        $scope.$on("ChangeTitle", function(evt, title) {
            $scope.model.title = title;
        });

        $scope.login = function(username, password) {
            APIClient.createUser(username, password).then(
                // promesa resuelta
                function(data) {
                    console.log("Login Successful!");
                    HtmlStorage.saveUser(username);
                    $location.url(paths.movieList);
                },
                // promesa rechazada
                function(data) {
                    $scope.uiState = 'error';
                    $window.alert("Login failed :( Check your username and your password!");
                    console.log("login error");
                }
            );
        };


    }]
);
