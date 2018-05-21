let droneWifi_V1_App = angular.module("drone-wifi-v1", ["ngMaterial", "ngMessages", "droneWifi_V1_template_controller"]);
droneWifi_V1_App.controller("drone-wifi-v1-ctrl", function PhoneListController($scope, $http) {
  this.defaultLanguage = "FR";
  $scope.currentPage = null;
  $scope.currentLang = null;
  $scope.langRessources = {};
  $scope.getText = function (key) {
    console.error("key: ", key);
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
      url: '/data/language_fr-fr.json',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function successCallback(response) {
      console.error("success response : ", response);
      $scope.langRessources = response.data;
      console.error("$scope.langRessources : ", $scope.langRessources);
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
  };
  this.pageRouter = function (page) {
    $scope.currentPage = page;
    localStorage.setItem('page', page);
  };
  this.init = function () {
    setCurrentPage();
    this.getChoosenLang();
    this.getLanguageFiles();
  };
  this.init();
});
