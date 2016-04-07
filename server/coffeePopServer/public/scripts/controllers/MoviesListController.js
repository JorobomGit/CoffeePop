angular.module("coffeePop").controller("MoviesListController", ["$scope", "$location", "HtmlStorage","$log", "APIClient", "URL", "paths",
    function($scope, $location, HtmlStorage, $log, APIClient, URL, paths) {

        /*Redireccion si no esta logeado*/
        if(!HtmlStorage.getUser()){
            $location.url(paths.login);
        }

        $scope.model = [];

        $scope.uiState = 'loading';        

        $scope.getMovieDetailURL = function(movie) {
            return URL.resolve(paths.movieDetail, { id: movie.id });
        };

        APIClient.getMovies().then(
            // promesa resuelta
            function(data) {
                $log.log("SUCCESS", data);
                $scope.model = data;
                if ($scope.model.length == 0) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", "Movies");
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
