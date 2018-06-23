let droneWifi_V1_App = angular.module("drone-wifi-v1", ["ngMaterial", "ngMessages", "droneWifi_V1_template_controller"]);
droneWifi_V1_App.directive('imageonload', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('load', function () {
        scope.loadingDone = true;
        scope.$apply();
      });
    }
  };
});
droneWifi_V1_App.controller("drone-wifi-v1-ctrl", function PhoneListController($scope, $http, $mdDialog, $sce) {


    this.getVideoTrustedUrl = function (url) {

      return $sce.trustAsResourceUrl(url);
    }

  this.defaultLanguage = "FR";
  $scope.currentPage = null;
  $scope.currentLang = null;
  $scope.langRessources = {};
  $scope.getText = function (key) {
    //console.error("key: ", key);
    if ($scope.currentLang && $scope.langRessources[$scope.currentLang] && $scope.langRessources[$scope.currentLang][key]) {
      return $scope.langRessources[$scope.currentLang][key];
    }
    return key;
  }

  function setCurrentPage() {
    $scope.currentPage = localStorage.getItem("page");
    if (!$scope.currentPage) {
      $scope.currentPage = "home";
    }
  }
  this.getLanguageFiles = function () {
    $http({
      method: 'GET',
      url: './data/language_fr-fr.json',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function successCallback(response) {
      //console.error("success response : ", response);
      $scope.langRessources = response.data;
      //console.error("$scope.langRessources : ", $scope.langRessources);
    }, function errorCallback(response) {
      console.error("error response : ", response);
    });
  }
  this.setLanguage = function (langWanted) {
    console.error("langWanted: ", langWanted);
  };
  this.getChoosenLang = function () {
    if (localStorage.getItem("lang")) {
      $scope.currentLang = localStorage.getItem("lang");
    } else if (!$scope.currentLang) {
      $scope.currentLang = this.defaultLanguage;
    }
  }
  $scope.getImageProperties = function (image) {
    var imageContainer = document.querySelector("div.md-dialog-container");
    if (!imageContainer) {
      return null;
    }
    imageW = image.width;
    imageH = image.height;
    targetW = imageContainer.offsetWidth;
    targetH = imageContainer.offsetHeight;
    imageRatio = imageW / imageH;
    targetRatio = targetW / targetH;
    adjustedW = targetW;
    adjustedH = targetH;
    if (imageRatio > targetRatio) {
      adjustedH = targetW / imageRatio;
    } else {
      adjustedW = targetH * imageRatio;
    }
    return {
      width: adjustedW.toString() + "px",
      height: adjustedH.toString() + "px"
    }
  };
  this.pageRouter = function (page) {
    $scope.currentPage = page;
    localStorage.setItem('page', page);
  };
  this.showPicture = function (picObj, picWidth, picHeight, ev) {
    //used to support google photo url arguments
    picObj.urlWithSize = picObj.url + (picObj.width && picObj.height ? "=w" + picObj.width + "-h" + picObj.height : '');
    this.showBigMediaRendering(picObj, ev);
  };
  this.showBigMediaRendering = function (mediaObj, mediaType, ev) {
    $scope.loadingDone = false;
    $mdDialog.show({
      templateUrl: "./tpl/mediaviewer.tpl.html",
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose: true,
      controller: function () {
        this.mediaObj = mediaObj;
      },
      controllerAs: "bigMediaCtrl"
    }).then(function () {
      console.error("then 1");
    }, function () {
      console.error("then 2");
    });
  };
  this.init = function () {
    setCurrentPage();
    this.getChoosenLang();
    this.getLanguageFiles();
  };
  this.init();
});
