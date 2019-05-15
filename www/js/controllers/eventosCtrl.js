angular.module('starter')
.controller('eventosCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $http, eventoService){

	$scope.pagina = "Eventos";

	// Modal Add e editar notícia
	$ionicModal.fromTemplateUrl('modal-evento.html',{
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});

	$scope.abreModalEvento = function(){
		$scope.modal.show();
	};

	$scope.fechaModalEvento = function(){
		$scope.modal.hide();
		$scope.novoEvento = {};
	};

	// Alertas
	$scope.erroUniversal = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Error</p>',
			template: '<p class="p-alert">Ocorre um erro inesperado</p>'
		})
	}

	$scope.showErrorEvento = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Todos os dados são obrigatórios!</p>'
		});
	};

	$scope.showSucessoEvento = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Evento cadastrado com sucesso</p>'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	};

	$scope.eventoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Evento editado com sucesso</p>'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	}

	$scope.naoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Evento não foi editado, tente novamente</p>'
		});
	}

	$scope.eventoExcluido = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Evento excluído com sucesso</p>'
		});
	};

	$scope.erroExcluirEvento = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Ocorreu um error, tente novamente</p>'
		});
	};

	// Função de Adicionar Notícia
	$scope.novoEvento = {};

	$scope.inserirEvento = function(novoEvento){

		if (novoEvento.titulo == undefined || novoEvento.titulo == "" || novoEvento.descricao == undefined || novoEvento.descricao == "" || novoEvento.data_evento == undefined || novoEvento.data_evento == "" || novoEvento.situacao == undefined || novoEvento.situacao == "") {

			$scope.showErrorEvento();

		} else {

			var input = document.getElementById('imagemEvento');

			var file = input.files[0];

			var nomeOriginal = file.name;

			var arr = nomeOriginal.split(".");

			var extensao = arr[arr.length - 1];

			var novoNome = gerarNome() +"."+ extensao;

			novoEvento.imagem = novoNome;

			var fd = new FormData();

			fd.append("file", file);
			fd.append("novo_nome", novoNome);

			$scope.uploading = true;   

			eventoService.upload(fd).success(function(result){

				$scope.uploading = false;
				// console.log(result);

				if (result.indexOf("upload_ok") !== -1) {

					eventoService.inserir({'evento': novoEvento}).success(function(result){
						// console.log(result);

						if (result.indexOf('evento_cadastrado') !== -1) {

							$scope.showSucessoEvento();
							$scope.fechaModalEvento();
							// $scope.visualizarUsuarios();

						}else if (result.indexOf('nao_cadastrou') !== -1) {
							// console.log(result);
							$scope.erroUniversal();
						}else{
							// console.log("Ocorreu um erro");
							$scope.erroUniversal();
						}
					})

				}else{
					// console.log("Ocorreu um erro");            		
				}

			}) 

		}
	}

	// Função gerar novo nome para a imagem quando faz upload para a pasta
	function gerarNome(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 10; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	// Função listar notícias
	$scope.visualizaEvento = [];

	$scope.visualizarEventos = function(){
		eventoService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaEvento = result;			
		})
	}
	$scope.visualizarEventos();

	// Ações da lista de notícia
	$scope.data = {
		showDelete: false
	};

	// Função abrir modal para editar notícia
	$scope.exibirEditar = function(lista){
		$scope.novoEvento = angular.copy(lista);
		$scope.novoEvento.btnEditar = true;
		$scope.abreModalEvento();
	}

	// Função editar notícia
	$scope.editarEvento = function(evento) {
		eventoService.editar({'evento' : evento}).success(function(result){
			resultJson = angular.toJson(result);

			if (resultJson.indexOf("evento_alterado") !== -1) {

				$scope.eventoEditado();
				$scope.fechaModalEvento();

			}else if(resultJson.indexOf("nao_alterado") !== -1){
				// console.log(result);
				$scope.naoEditado();
			}else{
				$scope.erroUniversal();
				// console.log(result);
			}
		})
	};	

	//Função deleta notícia
	$scope.onItemDelete = function(evento) {
		var confirmPopup = $ionicPopup.confirm({
			title: '<p class="p-alert">Excluir Evento</p>',
			template: '<p class="p-alert">Deseja realmente excluir esta evento?</p>',
			cancelText: 'Cancelar', 
			okText: 'Sim'
		});

		confirmPopup.then(function(res){
			if (res) {
				eventoService.deletar({'id_evento': evento.id_evento}).success(function(result){
					// console.log(result);

					resultJson = angular.toJson(result);

					if (resultJson.indexOf("evento_excluido") !== -1) {
						$scope.eventoExcluido();
						$scope.visualizarEventos();
					}else if(resultJson.indexOf("nao_excluido") !== -1){
						$scope.erroExcluirEvento();
					}else{
						// console.log("Ocorreu algum erro");
						$scope.erroUniversal();
					}
				})
			} else{
				// console.log("Não excluiu");
				$scope.erroUniversal();
			}
		})
	};


});