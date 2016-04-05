angular.module("pelisAngular").controller("MoviesListController", ["$scope", "$location", "HtmlStorage","$log", "APIClient", "URL", "paths",
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

        $scope.rentMovie = function(movie) {
            console.log("Pelicula: ", movie.id);
            $scope.rentedId = movie.id;

            if (!movie.userRent) {
                console.log("No esta alquilada");
                /*Alquilamos pelicula con un post*/
                APIClient.rentMovie(movie, HtmlStorage.getUser()).then(
                    // promesa resuelta
                    function(data) {
                        console.log("get Username",HtmlStorage.getUser());
                        $log.log("SUCCESS", data);
                        $scope.rented = true;
                    },
                    // promesa rechazada
                    function(data) {
                        $log.error("ERROR", data);
                        $scope.uiState = 'error';
                    }
                );
            } else {
                console.log("Esta alquilada");
                /*Devolvemos alert indicando error*/
                $scope.rented = false;
            }
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
