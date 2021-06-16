angular.module('starter')
	.factory('Utils', function ($http) {
		this.baseUrlService = "http://localhost:8080/";

		this.paramsPost = { headers: { 'Content-Type': undefined }, transformRequest: angular.identity };

		return this;
	})
	.factory('usuarioService', function ($http, Utils, $state) {
		this.upload = function (fd) {
			return $http.post(Utils.baseUrlService + 'usuarios/upload.php', fd, Utils.paramsPost);
		}

		this.inserir = function (params) {
			return $http.post(Utils.baseUrlService + 'usuarios/inserir.php', params);
		}

		this.visualizar = function (params) {
			return $http.post(Utils.baseUrlService + 'usuarios/visualiza.php', params);
		}

		this.editar = function (params) {
			return $http.post(Utils.baseUrlService + 'usuarios/edita.php', params);
		}

		this.deletar = function (params) {
			return $http.post(Utils.baseUrlService + 'usuarios/deleta.php', params);
		}

		return this;
	})
	.factory('noticiaService', function ($http, Utils, $state) {
		this.upload = function (fd) {
			return $http.post(Utils.baseUrlService + 'noticias/upload.php', fd, Utils.paramsPost);
		}

		this.inserir = function (params) {
			return $http.post(Utils.baseUrlService + 'noticias/inseri.php', params);
		}

		this.visualizar = function (params) {
			return $http.post(Utils.baseUrlService + 'noticias/visualiza.php', params);
		}

		this.editar = function (params) {
			return $http.post(Utils.baseUrlService + 'noticias/edita.php', params);
		}

		this.deletar = function (params) {
			return $http.post(Utils.baseUrlService + 'noticias/deleta.php', params);
		}

		return this;
	})
	.factory('eventoService', function ($http, Utils, $state) {
		this.upload = function (fd) {
			return $http.post(Utils.baseUrlService + 'eventos/upload.php', fd, Utils.paramsPost);
		}

		this.inserir = function (params) {
			return $http.post(Utils.baseUrlService + 'eventos/inseri.php', params);
		}

		this.visualizar = function (params) {
			return $http.post(Utils.baseUrlService + 'eventos/visualiza.php', params);
		}

		this.editar = function (params) {
			return $http.post(Utils.baseUrlService + 'eventos/edita.php', params);
		}

		this.deletar = function (params) {
			return $http.post(Utils.baseUrlService + 'eventos/deleta.php', params);
		}

		return this;
	})