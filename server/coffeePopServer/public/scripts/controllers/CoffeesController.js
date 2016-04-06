angular.module("pelisAngular").controller("CoffeesController", ["$scope", "$location", "HtmlStorage","$log", "APIClient", "URL", "paths",
    function($scope, $location, HtmlStorage, $log, APIClient, URL, paths) {

        /*Redireccion si no esta logeado*/
        if(!HtmlStorage.getUser()){
            $location.url(paths.login);
        }

        $scope.model = [];

        $scope.uiState = 'loading';

        $scope.getCoffeeDetail = function(coffee) {
            var url = paths.coffeeDetail + "?id=" + coffee._id;
            return url;
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
                    $scope.$emit("ChangeTitle", "Coffees");
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
