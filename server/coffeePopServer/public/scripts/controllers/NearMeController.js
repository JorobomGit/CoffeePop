angular.module("coffeePop").controller("NearMeController", ["$scope", "$log", "$routeParams", "$location", "APIClient", "paths", "NgMap",
        function($scope, $log, $routeParams, $location, APIClient, paths, NgMap) {
            //scope init
            $scope.model = {};
            $scope.uiState = 'loading';
            // COntroller init
            $scope.$emit("ChangeTitle", "Loading...");

            var vm = this;

            NgMap.getMap().then(function(map) {
                console.log('map', map);
                vm.map = map;
            });

            $scope.showDetail = function(e, coffee) {
                console.log(coffee._id);
                $scope.nameInfo = coffee.name;
                $scope.addressInfo = coffee.address;
                $scope.numberInfo = coffee.number;
                vm.map.showInfoWindow('foo-iw', coffee._id);
            };

            $scope.hideDetail = function() {
                vm.map.hideInfoWindow('foo-iw');
            };


            APIClient.getCoffees().then(
                // promesa resuelta
                function(data) {
                    $log.log("SUCCESS", data);
                    $scope.model = data.rows;
                    if ($scope.model.length == 0) {
                        $scope.uiState = 'blank';
                    } else {
                        $scope.uiState = 'ideal';
                        $scope.$emit("ChangeTitle", "Lets find!");
                    }
                },
                // promesa rechazada
                function(data) {
                    $log.error("ERROR", data);
                    $scope.uiState = 'error';
                }
            );
        }
    ]

);
