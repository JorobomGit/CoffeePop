angular.module("pelisAngular").controller("RentController", ["$scope", "$routeParams", "$location", "APIClient", "paths",

    function($scope, $routeParams, $location, APIClient, paths) {
        $scope.model = {};
        $scope.uiState = 'loading';

        $scope.$emit("ChangeTitle", "Loading...");
        APIClient.getMovie($routeParams.id).then(
            // Pelicula encontrada
            function(movie) {
                $scope.model = movie;
                $scope.uiState = 'ideal';
                $scope.$emit("ChangeTitle", $scope.model.title);
            },
            // Pelicula no encontrada
            function(error) {
                // TODO: improve error managment
                $location.url(paths.notFound);
            }
        );
    }
]);