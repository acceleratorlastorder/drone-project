(function () {
  'use strict';
  let templateController = angular.module('droneWifi_V1_template_controller', []);
  templateController.directive("home", function () {
    return {
      restrict: "E",
      templateUrl: "./tpl/home.tpl.html",
      controller: function () {},
      controllerAs: "home"
    };
  });
  templateController.directive("gallery", function () {
    return {
      restrict: "E",
      templateUrl: "./tpl/gallery.tpl.html",
      controller: function ($scope, $http) {
        $http({
          method: 'GET',
          url: './data/gallery.json',
          headers: {
            'Accept': 'application/json'
          }
        }).then(function successCallback(response) {
          console.error("success response : ", response);
          $scope.gallery = response.data;
          if (response.data.articles.length > 0) {
            $scope.galleryArticleIsReady = true;
          }
        }, function errorCallback(response) {
          console.error("error response : ", response);
        });
      },
      controllerAs: "gallery"
    };
  });
}());
