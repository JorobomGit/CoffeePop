angular.module("coffeePop").controller("CoffeeDetailController", ["$scope", "$routeParams", "$location", "APIClient", "paths",
        function($scope, $routeParams, $location, APIClient, paths) {
            //scope init
            $scope.model = {};
            $scope.uiState = 'loading';
            // COntroller init
            $scope.$emit("ChangeTitle", "Loading...");
            APIClient.getCoffee($routeParams.id).then(
                function(coffee) {
                    console.log(coffee);
                    $scope.model = coffee.rows[0];
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.name);
                    APIClient.updateViewsCoffee($scope.model).then(
                        function(coffee){
                            console.log('Visitadas aumentadas');
                        },
                        function(error){
                            console.log('Error visitas');
                        }
                        );
                },
                function(error) {
                    console.log("ERROR")
                    $location.url(paths.notFound);
                }
            );

        }
    ]

);
