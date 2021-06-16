angular.module('starter.controllers', [])
	.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
		$scope.baseUrlImagem = "/upload";

		$scope.logOff = function () {
			$state.go("login");
		}
	})