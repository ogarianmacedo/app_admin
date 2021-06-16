angular.module('starter')
	.controller('noticiaCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, $state, $http, noticiaService) {
		$scope.pagina = "Notícias";

		// Modal Add e editar notícia
		$ionicModal.fromTemplateUrl('modal-noticia.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});

		$scope.abreModalNoticia = function () {
			$scope.modal.show();
		};

		$scope.fechaModalNoticia = function () {
			$scope.modal.hide();
			$scope.novaNoticia = {};
		};

		// Alertas
		$scope.erroUniversal = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Error</p>',
				template: '<p class="p-alert">Ocorre um erro inesperado</p>'
			})
		}

		$scope.showErrorNoticia = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Ops!</p>',
				template: '<p class="p-alert">Todos os dados são obrigatórios!</p>'
			});
		};

		$scope.showSucessoNoticia = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Muito bem!</p>',
				template: '<p class="p-alert">Notícia cadastrada com sucesso</p>'
			});

			alertPopup.then(function (res) {
				location.reload();
			});
		};

		$scope.noticiaEditada = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Muito bem!</p>',
				template: '<p class="p-alert">Notícia editada com sucesso</p>'
			});

			alertPopup.then(function (res) {
				location.reload();
			});
		}

		$scope.naoEditada = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Ops!</p>',
				template: '<p class="p-alert">Noticía não foi editada, tente novamente</p>'
			});
		}

		$scope.noticiaExcluido = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Muito bem!</p>',
				template: '<p class="p-alert">Noticía excluída com sucesso</p>'
			});
		};

		$scope.erroExcluirNoticia = function () {
			var alertPopup = $ionicPopup.alert({
				title: '<p class="p-alert">Ops!</p>',
				template: '<p class="p-alert">Ocorreu um error, tente novamente</p>'
			});
		};

		// Função de Adicionar Notícia
		$scope.novaNoticia = {};

		$scope.inserirNoticia = function (novaNoticia) {
			if (novaNoticia.titulo == undefined || novaNoticia.titulo == "" || novaNoticia.descricao == undefined || novaNoticia.descricao == "") {
				$scope.showErrorNoticia();
			} else {
				var input = document.getElementById('imagemNoticia');
				var file = input.files[0];
				if (file == undefined) {
					$scope.showErrorNoticia();
				}
				var nomeOriginal = file.name;
				var arr = nomeOriginal.split(".");
				var extensao = arr[arr.length - 1];
				var novoNome = gerarNome() + "." + extensao;
				novaNoticia.imagem = novoNome;
				var fd = new FormData();
				fd.append("file", file);
				fd.append("novo_nome", novoNome);
				$scope.uploading = true;

				noticiaService.upload(fd).success(function (result) {
					$scope.uploading = false;
					if (result.indexOf("upload_ok") !== -1) {
						noticiaService.inserir({ 'noticia': novaNoticia }).success(function (result) {
							if (result.indexOf('noticia_cadastrada') !== -1) {
								$scope.showSucessoNoticia();
								$scope.fechaModalNoticia();
							} else if (result.indexOf('nao_cadastrou') !== -1) {
								$scope.erroUniversal();
							} else {
								$scope.erroUniversal();
							}
						})
					} else {
						// console.log("Ocorreu um erro");            		
					}
				})
			}
		}

		// Função gerar novo nome para a imagem quando faz upload para a pasta
		function gerarNome() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 10; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}

		// Função listar notícias
		$scope.visualizaNoticia = [];

		$scope.visualizarNoticias = function () {
			noticiaService.visualizar().success(function (result) {
				$scope.visualizaNoticia = result;
			})
		}
		$scope.visualizarNoticias();

		// Ações da lista de notícia
		$scope.data = {
			showDelete: false
		};

		// Função abrir modal para editar notícia
		$scope.exibirEditar = function (lista) {
			$scope.novaNoticia = angular.copy(lista);
			$scope.novaNoticia.btnEditar = true;
			$scope.abreModalNoticia();
		}

		// Função editar notícia
		$scope.editarNoticia = function (noticia) {
			noticiaService.editar({ 'noticia': noticia }).success(function (result) {
				resultJson = angular.toJson(result);

				if (resultJson.indexOf("noticia_alterada") !== -1) {

					$scope.noticiaEditada();
					$scope.fechaModalNoticia();

				} else if (resultJson.indexOf("nao_alterado") !== -1) {
					$scope.naoEditada();
				} else {
					$scope.erroUniversal();
				}
			})
		};

		//Função deleta notícia
		$scope.onItemDelete = function (noticia) {
			var confirmPopup = $ionicPopup.confirm({
				title: '<p class="p-alert">Excluir Notícia</p>',
				template: '<p class="p-alert">Deseja realmente excluir esta notícia?</p>',
				cancelText: 'Cancelar',
				okText: 'Sim'
			});

			confirmPopup.then(function (res) {
				if (res) {
					noticiaService.deletar({ 'id_noticia': noticia.id_noticia }).success(function (result) {
						resultJson = angular.toJson(result);

						if (resultJson.indexOf("noticia_excluida") !== -1) {
							$scope.noticiaExcluido();
							$scope.visualizarNoticias();
						} else if (resultJson.indexOf("nao_excluido") !== -1) {
							$scope.erroExcluirNoticia();
						} else {
							$scope.erroUniversal();
						}
					})
				} else {
					$scope.erroUniversal();
				}
			})
		};
	});