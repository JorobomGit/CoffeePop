angular.module("coffeePop").controller("AddMovieController", ["$scope", "$location", "$routeParams", "$log", "APIClient", "URL", "paths",
    function($scope, $location, $routeParams, $log, APIClient, URL, paths) {

        //scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        // Controller init
        $scope.$emit("ChangeTitle", "Add Movie");


        $scope.addMovie = function() {
            APIClient.createMovie($scope.model).then(
                function(movie) {                
                    $location.url(paths.movieList);
                    $scope.successMessage = "Movie saved! <a href=\"#/movies/" +
                        movie.id + "\">View new movie detail</a>";
                },
                function(error) {
                    $scope.errorMessage = "Fatal error. The end is near";
                }
            )
        };

    }
]);
