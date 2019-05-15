angular.module('starter')
.controller('usuariosCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $http, usuarioService){

	$scope.pagina = "Usuários";

	// Modal Add e editar usuário
	$ionicModal.fromTemplateUrl('modal-usuario.html',{
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});

	$scope.abreModalUser = function(){
		$scope.modal.show();
	};

	$scope.fechaModalUser = function(){
		$scope.modal.hide();
	};

	// Alertas
	$scope.erroUniversal = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Error',
			template: 'Ocorre um erro inesperado'
		})
	}

	$scope.showError = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Ops!',
			template: 'Todos os dados são obrigatórios!'
		});
	};

	$scope.showSucesso = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Muito bem!',
			template: 'Usuário cadastrado com sucesso'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	};

	$scope.usuarioEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Muito bem!',
			template: 'Usuário editado com sucesso'
		});

		alertPopup.then(function(res){
			location.reload();
		});
	}

	$scope.naoEditado = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Ops!',
			template: 'Usuário não foi editado, tente novamente'
		});
	}

	$scope.usuarioExcluido = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Muito bem!',
			template: 'Usuário excluído com sucesso'
		});
	};

	$scope.erroExcluir = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Ops!',
			template: 'Ocorreu um error, tente novamente'
		});
	};

	// Função de Adicionar Usuário
	$scope.novoUsuario = {};

	$scope.inserirUsuario = function(novoUsuario){

		if (novoUsuario.nome == undefined || novoUsuario.nome == "" || 	novoUsuario.email == undefined || novoUsuario.email == "" || novoUsuario.usuario == undefined || novoUsuario.usuario == "" || novoUsuario.senha == undefined || novoUsuario.senha == "") {

			$scope.showError();

		} else {

			var input = document.getElementById('imagemUsuario');

			var file = input.files[0];

			var nomeOriginal = file.name;

			var arr = nomeOriginal.split(".");

			var extensao = arr[arr.length - 1];

			var novoNome = gerarNome() +"."+ extensao;

			novoUsuario.imagem = novoNome;

			var fd = new FormData();

			fd.append("file", file);
			fd.append("novo_nome", novoNome);

			$scope.uploading = true;   

			usuarioService.upload(fd).success(function(result){

				$scope.uploading = false;
				// console.log(result);

				if (result.indexOf("upload_ok") !== -1) {

					usuarioService.inserir({'user': novoUsuario}).success(function(result){
						// console.log(result);

						if (result.indexOf('usuario_cadastrado') !== -1) {

							$scope.showSucesso();
							$scope.fechaModalUser();
							// $scope.visualizarUsuarios();

						}else if (result.indexOf('usuario_nao_cadastrado') !== -1) {
							$scope.showError();
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

	// Função listar usuários
	$scope.visualizaUsuario = [];

	$scope.visualizarUsuarios = function(){
		usuarioService.visualizar().success(function(result){
			// console.log(result);
			$scope.visualizaUsuario = result;			
		})
	}
	$scope.visualizarUsuarios();

	// Ações da lista de usuários
	$scope.data = {
		showDelete: false
	};

	// $scope.moveItem = function(lista, fromIndex, toIndex) {
	// 	$scope.visualizaUsuario.splice(fromIndex, 1);
	// 	$scope.visualizaUsuario.splice(toIndex, 0, lista);
	// };

	// Função abrir modal para editar usuário
	$scope.exibirEditar = function(lista){
		$scope.novoUsuario = angular.copy(lista);
		$scope.novoUsuario.btnEditar = true;
		$scope.abreModalUser();
	}

	// Função editar usuário
	$scope.editarUsuario = function(user) {
		usuarioService.editar({'user' : user}).success(function(result){
			resultJson = angular.toJson(result);

			if (resultJson.indexOf("usuario_alterado") !== -1) {

				$scope.usuarioEditado();
				$scope.fechaModalUser();

			}else if(resultJson.indexOf("nao_alterado") !== -1){
				$scope.naoEditado();
			}else{
				$scope.erroUniversal();
			}
		})
	};	

	//Função deleta usuário
	$scope.onItemDelete = function(user) {
		var confirmPopup = $ionicPopup.confirm({
			title: '<p class="p-alert">Excluir Usuário</p>',
			template: '<p class="p-alert">Deseja realmente excluir este usuário?</p>',
			cancelText: 'Cancelar', 
			okText: 'Sim'
		});

		confirmPopup.then(function(res){
			if (res) {
				usuarioService.deletar({'id_usuario': user.id_usuario}).success(function(result){
					// console.log(result);

					resultJson = angular.toJson(result);

					if (resultJson.indexOf("usuario_excluido") !== -1) {
						$scope.usuarioExcluido();
						$scope.visualizarUsuarios();
					}else if(resultJson.indexOf("nao_excluido") !== -1){
						$scope.erroExcluir();
					}else{
						// console.log("Ocorreu algum erro");
						$scope.erroUniversal();
					}
				})
			} //else{
			// 	console.log("Não excluiu");
			// 	$scope.erroUniversal();
			// }
		})
	};

});