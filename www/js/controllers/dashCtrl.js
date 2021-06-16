angular.module('starter')
	.controller('dashCtrl', function ($scope, noticiaService, eventoService) {
		$scope.pagina = "Dashboard";

		// Funções de listar itens
		$scope.visualizaEvento = [];
		$scope.visualizarEventos = function () {
			eventoService.visualizar().success(function (result) {
				$scope.visualizaEvento = result;
			})
		}
		$scope.visualizarEventos();

		$scope.visualizaNoticia = [];
		$scope.visualizarNoticias = function () {
			noticiaService.visualizar().success(function (result) {
				$scope.visualizaNoticia = result;
			})
		}
		$scope.visualizarNoticias();
	});