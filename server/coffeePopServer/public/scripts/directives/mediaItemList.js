angular.module("coffeePop").directive("mediaItemList", function() {
    return {
        restrict: "AE",
        scope: {
            model: "=items",
            getDetailUrl: "&"
        },
        templateUrl: "views/mediaItemList.html"
    };
});
