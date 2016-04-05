angular.module("pelisAngular").controller("MovieFormController", ["$scope", "APIClient", function($scope, APIClient) {

    $scope.model = {};
    $scope.successMessage = null;
    $scope.errorMessage = null;

    $scope.saveMovie = function() {
        APIClient.createMovie($scope.model).then(
            function(movie) {
                $scope.successMessage = "Movie saved! <a href=\"#/movies/" +
                    movie.id + "\">View new movie detail</a>";
                $scope.model = {};
                $scope.movieForm.$setPristine();
            },
            function(error) {
                $scope.errorMessage = "Fatal error. The end is near";
            }
        )
    };
}]);
