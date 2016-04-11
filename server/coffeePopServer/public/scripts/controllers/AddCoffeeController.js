angular.module("coffeePop").controller("AddCoffeeController", ["$scope", "$location", "$routeParams", "$log", "APIClient", "URL", "paths", "HtmlStorage",
    function($scope, $location, $routeParams, $log, APIClient, URL, paths, HtmlStorage) {
        /*Redireccion si no esta logeado*/
        if (!HtmlStorage.getUser()) {
            $location.url(paths.login);
        }
        
        //scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        // Controller init
        $scope.$emit("ChangeTitle", "Add Coffee Shop");


        $scope.addCoffee = function() {
            APIClient.createCoffee($scope.model).then(
                function(coffee) {   
                    console.log("HOLAAAA");
                    console.log(coffee);
                    $scope.successMessage = "Coffee saved! <a href=\"#/coffee/" +
                        coffee.id + "\">View new coffee detail</a>";
                    $location.url(paths.coffees);
                    console.log("llega");
                    
                },
                function(error) {
                    console.log("ERRROOOOOOOR");
                    $scope.errorMessage = "Fatal error. The end is near";
                }
            )
        };

    }
]);
