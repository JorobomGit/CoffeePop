angular.module("pelisAngular").controller("RentedListController", ["$scope", "$log", "APIClient", "URL", "paths",
    function($scope, $log, APIClient, URL, paths) {

        /* Scope model init */
        $scope.model = [];

        $scope.uiState = 'loading';
       
        $scope.getMovieDetailURL = function(movie){
            return URL.resolve(paths.movieDetail, {id: movie.id});
        };
        
        /* controller start*/
        APIClient.getMovies().then(
            // promesa resuelta
            function(data) {
                $log.log("SUCCESS", data);
                $scope.model = data;
                if ($scope.model.length == 0) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.uiState = 'ideal';
                }
            },
            // promesa rechazada
            function(data) {
                $log.error("ERROR", data);
                $scope.uiState = 'error';
            }

        );
    }
]);