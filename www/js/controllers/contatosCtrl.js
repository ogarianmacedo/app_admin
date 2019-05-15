angular.module('starter')
.controller('contatosCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $http, contatoService){

	$scope.pagina = "Contatos";


	// Modal Add e editar contato
	$ionicModal.fromTemplateUrl('modal-contato.html',{
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});

	$scope.abreModalContato = function(){
		$scope.modal.show();
	};

	$scope.fechaModalContato = function(){
		$scope.modal.hide();
	};

	// Alertas
	$scope.erroUniversal = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Error</p>',
			template: '<p class="p-alert">Ocorre um erro inesperado</p>'
		})
	}

	$scope.showError = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Todos os dados são obrigatórios!</p>'
		});
	};

	$scope.showSucesso = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Contato cadastrado com sucesso</p>'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	};

	$scope.contatoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Contato editado com sucesso</p>'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	}

	$scope.naoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Contato não foi editado, tente novamente</p>'
		});
	}

	$scope.contatoExcluido = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Contato excluído com sucesso</p>'
		});
	};

	$scope.erroExcluir = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Ocorreu um error, tente novamente</p>'
		});
	};

	// Função de Adicionar Contato
	$scope.novoContato = {};

	$scope.inserirContato = function(novoContato){

		if (novoContato.nome == undefined || novoContato.nome == "" || 	novoContato.email == undefined || novoContato.email == "" || novoContato.telefone == undefined || novoContato.telefone == "") {

			$scope.showError();

		} else {

			contatoService.inserir({'contato': novoContato}).success(function(result){
				// console.log(result);

				if (result.indexOf('contato_cadastrado') !== -1) {

					$scope.showSucesso();
					$scope.fechaModalContato();
					// $scope.visualizarUsuarios();

				}else if (result.indexOf('nao_cadastrado') !== -1) {
					$scope.showError();
				}else{
					// console.log("Ocorreu um erro");
					$scope.erroUniversal();
				}
			})
		}
	}

	// Função listar contato
	$scope.visualizaContato = [];

	$scope.visualizarContatos = function(){
		contatoService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaContato = result;			
		})
	}
	$scope.visualizarContatos();

	// Ações da lista de contato
	$scope.data = {
		showDelete: false
	};

	// Função abrir modal para editar contato
	$scope.exibirEditar = function(lista){
		$scope.novoContato = angular.copy(lista);
		$scope.novoContato.btnEditar = true;
		$scope.abreModalContato();
	}

	// Função editar Contato
	$scope.editarContato = function(contato) {
		contatoService.editar({'contato' : contato}).success(function(result){
			resultJson = angular.toJson(result);
			// console.log(result);

			if (resultJson.indexOf("contato_alterado") !== -1) {
				// console.log(result);

				$scope.contatoEditado();
				$scope.fechaModalContato();

			}else if(resultJson.indexOf("nao_alterado") !== -1){
				// console.log(result);
				$scope.naoEditado();
			}else{
				$scope.erroUniversal();
				// console.log(result);				
			}
		})
	};	

	//Função deleta contato
	$scope.onItemDelete = function(contato) {
		var confirmPopup = $ionicPopup.confirm({
			title: '<p class="p-alert">Excluir Contato</p>',
			template: '<p class="p-alert">Deseja realmente excluir este contato?</p>',
			cancelText: 'Cancelar', 
			okText: 'Sim'
		});

		confirmPopup.then(function(res){
			if (res) {
				contatoService.deletar({'id_contato': contato.id_contato}).success(function(result){
					// console.log(result);

					resultJson = angular.toJson(result);

					if (resultJson.indexOf("contato_excluido") !== -1) {
						$scope.contatoExcluido();
						$scope.visualizarContatos();
					}else if(resultJson.indexOf("nao_excluido") !== -1){
						$scope.erroExcluir();
					}else{
						// console.log("Ocorreu algum erro");
						$scope.erroUniversal();
					}
				})
			} 
		})
	};

});