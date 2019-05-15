angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

	// $scope.baseUrlImagem = "http://localhost/app_admin/www/upload";
	$scope.baseUrlImagem = "https://up-apps.000webhostapp.com/upload";

	$scope.logOff = function(){
		location.reload();
		$state.go("login");
	}

})