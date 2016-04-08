angular.module("coffeePop").controller("FavsController", ["$scope", "$location", "HtmlStorage", "$log", "APIClient", "URL", "paths",
    function($scope, $location, HtmlStorage, $log, APIClient, URL, paths) {

        /*Redireccion si no esta logeado*/
        if (!HtmlStorage.getUser()) {
            $location.url(paths.login);
        }

        $scope.model = [];

        $scope.uiState = 'loading';

        $scope.favs = function(coffee) {
            var user = HtmlStorage.getUser();
            console.log("Useeeer: ", user);
            console.log("Coffeee: ", coffee);
            if (user.favorites.indexOf(coffee._id) != -1) {
                /*Remove coffee*/
                console.log("Already has this coffee");
                user.favorites.splice(user.favorites.indexOf(coffee._id), 1);
            } else {
                /*Add coffee*/
                user.favorites.push(coffee._id);
            }

            /*Put this user into our server DB*/
            APIClient.updateUser(user).then(
                function(data) {
                    HtmlStorage.saveUser(user);
                    $log.log("SUCCESS", data);
                },
                // promesa rechazada
                function(data) {
                    $log.error("ERROR", data);
                    //$scope.favs = 'error';
                }
            )
        };

        $scope.checkFav = function(coffee) {
            var user = HtmlStorage.getUser();
            if (user.favorites.indexOf(coffee._id) != -1) {
                /*This user already has this coffee in his fav list*/
                console.log("Already has this coffee");
                return true;
            }
            return false;
        }

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

        $scope.filterFavs = function(coffee) {
            var user = HtmlStorage.getUser();
            /*Check if coffee is in user favorites*/
            if(user.favorites.indexOf(coffee._id) !== -1){
                return coffee;
            }
        }
    }
]);
