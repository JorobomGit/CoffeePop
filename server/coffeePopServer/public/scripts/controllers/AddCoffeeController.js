angular.module("coffeePop").controller("AddCoffeeController", ["$scope", "$location", "$routeParams", "$log", "APIClient", "URL", "paths",
    function($scope, $location, $routeParams, $log, APIClient, URL, paths) {

        //scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        // Controller init
        $scope.$emit("ChangeTitle", "Add Coffee Shop");


        $scope.addCoffee = function() {
            APIClient.createCoffee($scope.model).then(
                function(coffee) {                
                    $location.url(paths.coffees);
                    $scope.successMessage = "Coffee saved! <a href=\"#/coffee/" +
                        coffee.id + "\">View new coffee detail</a>";
                },
                function(error) {
                    $scope.errorMessage = "Fatal error. The end is near";
                }
            )
        };

    }
]);
