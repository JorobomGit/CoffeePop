angular.module("coffeePop").controller("NearMeController", ["$scope", "$log", "$routeParams", "$location", "APIClient", "paths",
        function($scope, $log, $routeParams, $location, APIClient, paths) {
            //scope init
            $scope.model = {};
            $scope.uiState = 'loading';
            // COntroller init
            $scope.$emit("ChangeTitle", "Loading...");
            APIClient.getCoffees().then(
                // promesa resuelta
                function(data) {
                    $log.log("SUCCESS", data);
                    $scope.model = data.rows;
                    if ($scope.model.length == 0) {
                        $scope.uiState = 'blank';
                    } else {
                        $scope.uiState = 'ideal';
                        $scope.$emit("ChangeTitle", "Coffees");
                    }
                },
                // promesa rechazada
                function(data) {
                    $log.error("ERROR", data);
                    $scope.uiState = 'error';
                }
            );

            showDetail = function(e, coffee) {
                vm.coffee = coffee;
                vm.map.showInfoWindow('foo-iw', coffee._id);
            };


        }
    ]

);
