angular.module("pelisAngular").controller("AccountController", ["$scope", "$routeParams", "$location", "APIClient", "HtmlStorage", "paths",
        function($scope, $routeParams, $location, APIClient, HtmlStorage, paths) {
            //scope init
            $scope.model = {};
            $scope.uiState = 'loading';
            // COntroller init
            $scope.$emit("ChangeTitle", "Loading...");
            $scope.model = HtmlStorage.getUser();
            $scope.uiState = 'ideal';
            var title = $scope.model.name + "'s Account";
            $scope.$emit("ChangeTitle", title);
        }
    ]

);