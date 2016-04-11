angular.module("coffeePop").controller("AppController",

    //Cada vez que queramos utilizar un servicio lo tenemos que inyectar tanto como parametro como
    //en la funcion
    ["$scope", "$window", "$sce", "$location", "$interval", "HtmlStorage", "paths", "APIClient", function($scope, $window, $sce, $location, $interval, HtmlStorage, paths, APIClient) {
        var controller = this;

        controller.titles = {};

        controller.titles[paths.account] = "Account";
        controller.titles[paths.coffees] = "Coffees :D";
        controller.titles[paths.nearMe] = "Lets find!";
        controller.titles[paths.favs] = "Favorite";
        controller.titles[paths.login] = "Login";
        controller.titles[paths.addCoffee] = "Add Coffeeeee";

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
            $scope.uiState = 'loading';
            APIClient.loginUser(username, password).then(
                // promesa resuelta
                function(data) {
                    console.log("Login Successful!");
                    console.log("Datos", data);
                    HtmlStorage.saveUser(data[0]);
                    $location.url(paths.coffees);
                },
                // promesa rechazada
                function(data) {
                    $scope.uiState = 'error';
                    $window.alert("Login failed :( Check your username and your password!");
                    console.log("login error");
                }
            );
        };

        $scope.signup = function(username, password, email, number) {
            $scope.uiState = 'loading';
            APIClient.createUser(username, password, email, number).then(
                // promesa resuelta
                function(data) {
                    console.log("Register Successful!");
                    HtmlStorage.saveUser(data);
                    console.log(HtmlStorage.getUser());
                    $location.url(paths.coffees);
                    $window.alert("Register successful!");
                },
                // promesa rechazada
                function(data) {
                    $scope.uiState = 'error';
                    $window.alert("Register failed :S Try other data please");
                    console.log("Register error");
                }
            );
        };


        function randomBG() {
            var random = Math.random();
            if (random < 0.33) {
                $scope.bg1 = true;
                $scope.bg2 = false;
                $scope.bg3 = false;
            } else if (random > 0.66) {
                $scope.bg1 = false;
                $scope.bg2 = true;
                $scope.bg3 = false;
            } else {
                $scope.bg1 = false;
                $scope.bg2 = false;
                $scope.bg3 = true;
            }
            return;
        }

        $interval(randomBG, 7000);


    }]
);
