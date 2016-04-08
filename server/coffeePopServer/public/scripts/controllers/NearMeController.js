angular.module("coffeePop").controller("NearMeController", ["$scope", "$routeParams", "$location", "APIClient", "HtmlStorage", "paths",
        function($scope, $routeParams, $location, APIClient, HtmlStorage, paths) {
            var mapDiv = document.getElementById('map');
            var map = new google.maps.Map(mapDiv, {
                center: { lat: 44.540, lng: -78.546 },
                zoom: 8
            });
        }
    ]

);
