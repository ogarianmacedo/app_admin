angular.module('starter')
.controller('arquivosCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $http, arquivoService){

	$scope.pagina = "Arquivos";

	// Modal Add e editar notícia
	$ionicModal.fromTemplateUrl('modal-arquivo.html',{
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});

	$scope.abreModalArquivo = function(){
		$scope.modal.show();
	};

	$scope.fechaModalArquivo = function(){
		$scope.modal.hide();
		$scope.novoArquivo = {};
	};

	// Alertas
	$scope.erroUniversal = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Error</p>',
			template: '<p class="p-alert">Ocorre um erro inesperado</p>'
		})
	}

	$scope.showErrorArquivo = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Todos os dados são obrigatórios!</p>'
		});
	};

	$scope.showSucessoArquivo = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Novo arquivo cadastrado</p>'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	};

	$scope.arquivoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Registros do arquivo foram editados com sucesso</p>'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	}

	$scope.naoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Registros do arquivo não foram editados</p>'
		});
	}

	$scope.arquivoExcluido = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Muito bem!</p>',
			template: '<p class="p-alert">Arquivo excluída com sucesso</p>'
		});
	};

	$scope.erroExcluirArquivo = function(){
		var alertPopup = $ionicPopup.alert({
			title: '<p class="p-alert">Ops!</p>',
			template: '<p class="p-alert">Ocorreu um error, tente novamente</p>'
		});
	};

	// Função de Adicionar Arquivo
	$scope.novoArquivo = {};

	$scope.inserirNoticia = function(novoArquivo){

		if (novoArquivo.nome == undefined || novoArquivo.nome == "" || 	novoArquivo.observacao == undefined || novoArquivo.observacao == "") {

			$scope.showErrorArquivo();

		} else {

			var input = document.getElementById('imagemArquivo');

			var file = input.files[0];

			var nomeOriginal = file.name;

			var arr = nomeOriginal.split(".");

			var extensao = arr[arr.length - 1];

			var novoNome = gerarNome() +"."+ extensao;

			novoArquivo.anexo = novoNome;

			var fd = new FormData();

			fd.append("file", file);
			fd.append("novo_nome", novoNome);

			$scope.uploading = true;   

			arquivoService.upload(fd).success(function(result){

				$scope.uploading = false;
				// console.log(result);

				if (result.indexOf("upload_ok") !== -1) {

					arquivoService.inserir({'arquivo': novoArquivo}).success(function(result){
						// console.log(result);

						if (result.indexOf('arquivo_cadastrado') !== -1) {

							$scope.showSucessoArquivo();
							$scope.fechaModalArquivo();
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

	// Função listar arquivo
	$scope.visualizaArquivo = [];

	$scope.visualizarArquivos = function(){
		arquivoService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaArquivo = result;			
		})
	}
	$scope.visualizarArquivos();

	// Ações da lista de arquivo
	$scope.data = {
		showDelete: false
	};

	// $scope.moveItem = function(lista, fromIndex, toIndex) {
	// 	$scope.visualizaUsuario.splice(fromIndex, 1);
	// 	$scope.visualizaUsuario.splice(toIndex, 0, lista);
	// };

	// Função abrir modal para editar arquivo
	$scope.exibirEditar = function(lista){
		$scope.novoArquivo = angular.copy(lista);
		$scope.novoArquivo.btnEditar = true;
		$scope.abreModalArquivo();
	}

	// Função editar arquivo
	$scope.editarArquivo = function(arquivo) {
		arquivoService.editar({'arquivo' : arquivo}).success(function(result){
			resultJson = angular.toJson(result);

			if (resultJson.indexOf("arquivo_alterado") !== -1) {
				// console.log(result);

				$scope.arquivoEditado();
				$scope.fechaModalArquivo();

			}else if(resultJson.indexOf("nao_alterado") !== -1){
				// console.log(result);
				$scope.naoEditado();
			}else{
				$scope.erroUniversal();
				// console.log(result);
			}
		})
	};	

	//Função deleta arquivo
	$scope.onItemDelete = function(arquivo) {
		var confirmPopup = $ionicPopup.confirm({
			title: '<p class="p-alert">Excluir Arquivo</p>',
			template: '<p class="p-alert">Deseja realmente excluir este registro de arquivo?</p>',
			cancelText: 'Cancelar', 
			okText: 'Sim'
		});

		confirmPopup.then(function(res){
			if (res) {
				arquivoService.deletar({'id_arquivo': arquivo.id_arquivo}).success(function(result){
					console.log(result);

					resultJson = angular.toJson(result);

					if (resultJson.indexOf("arquivo_excluido") !== -1) {
						$scope.arquivoExcluido();
						$scope.visualizarArquivos();
					}else if(resultJson.indexOf("nao_excluido") !== -1){
						$scope.erroExcluirArquivo();
					}else{
						console.log("Ocorreu algum erro");
						$scope.erroUniversal();
					}
				})
			} else{
				console.log("Não excluiu");
				$scope.erroUniversal();
			}
		})
	};


});