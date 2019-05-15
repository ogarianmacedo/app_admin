angular.module('starter')
.controller('dashCtrl', function($scope, noticiaService, eventoService, arquivoService, contatoService){

	$scope.pagina = "Dashboard";

	// Funções de listar itens
	$scope.visualizaContato = [];
	$scope.visualizarContatos = function(){
		contatoService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaContato = result;			
		})
	}
	$scope.visualizarContatos();

	$scope.visualizaArquivo = [];
	$scope.visualizarArquivos = function(){
		arquivoService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaArquivo = result;			
		})
	}
	$scope.visualizarArquivos();

	$scope.visualizaEvento = [];
	$scope.visualizarEventos = function(){
		eventoService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaEvento = result;			
		})
	}
	$scope.visualizarEventos();

	$scope.visualizaNoticia = [];
	$scope.visualizarNoticias = function(){
		noticiaService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaNoticia = result;			
		})
	}
	$scope.visualizarNoticias();
});