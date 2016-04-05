angular.module("pelisAngular").controller("MovieDetailController", ["$scope", "$routeParams", "$location", "APIClient", "paths",
        function($scope, $routeParams, $location, APIClient, paths) {
            //scope init
            $scope.model = {};
            $scope.uiState = 'loading';
            // COntroller init
            $scope.$emit("ChangeTitle", "Loading...");
            APIClient.getMovie($routeParams.id).then(
                //pelicula encontrada
                function(movie) {
                    $scope.model = movie;
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.title);
                },
                //pelicula no encontrada
                function(error) {
                    $location.url(paths.notFound);
                }
            );

        }
    ]

);
