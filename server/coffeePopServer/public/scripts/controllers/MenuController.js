angular.module('coffeePop').controller("MenuController", ["$scope", "HtmlStorage", "$location", "paths", function($scope, HtmlStorage, $location, paths) {
    //Inyectamos dependencia de scope

    $scope.model = {
        selectedItem: paths.login
    };

    $scope.paths = paths;

    //Scope methods

    $scope.getClassForItem = function(item) {
        if ($scope.model.selectedItem == item) {
            return "active";
        } else {
            return "";
        }
    };

    $scope.logout = function() {
        HtmlStorage.removeUser();
    };


    $scope.$watch("model.selectedItem", function(newValue, oldValue) {
        $scope.$emit("OnMenuChange", newValue);
    });

    $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
        $scope.model.selectedItem = $location.path();
    });
}]);
