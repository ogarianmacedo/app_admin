angular.module('starter')
	.controller('loginCtrl', function ($scope, $http, $state, $ionicPopup) {
		$scope.pagina = "Login";

		$scope.logarUsuario = function () {
			var dados = 'usuario=' + this.user_usuario + '&senha=' + this.user_senha;

			$http({
				method: 'POST',
				url: 'http://localhost:8080/login.php',
				data: dados,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function (resolve) {
				if (resolve.success) {
					$ionicPopup.alert({
						title: '<p class="p-alert">Olá!</p>',
						template: '<p class="p-alert">' + resolve.message + '<p/>'
					}).then(function () {
						$state.go('app.browse');
					});
				} else {
					$ionicPopup.alert({
						title: '<p class="p-alert">Ops!</p>',
						template: '<p class="p-alert">' + resolve.message + '<p/>'
					});
				}
			}).error(function () {
				alert('Erro ao efeturar login');
			})
		}
	});