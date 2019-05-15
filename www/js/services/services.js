angular.module('starter')
.factory('Utils', function($http){
	
	this.baseUrl = "http://localhost/app_admin/www/";
	this.baseUrlService = this.baseUrl + "service/";

	this.paramsPost = {headers: {'Content-Type': undefined }, transformRequest: angular.identity};

	return this;

})

.factory('usuarioService', function($http, Utils, $state){

	this.upload = function(fd){
		return $http.post(Utils.baseUrlService + 'usuarios/upload.php', fd, Utils.paramsPost);
	}

	this.inserir = function(params){
		return $http.post(Utils.baseUrlService + 'usuarios/inserir.php', params);
	}

	this.visualizar = function(params){
		return $http.post(Utils.baseUrlService + 'usuarios/visualiza.php', params);
	}

	this.editar = function(params){
		return $http.post(Utils.baseUrlService + 'usuarios/edita.php', params);
	}

	this.deletar = function(params){
		return $http.post(Utils.baseUrlService + 'usuarios/deleta.php', params);
	}

	return this;

})

.factory('noticiaService', function($http, Utils, $state){

	this.upload = function(fd){
		return $http.post(Utils.baseUrlService + 'noticias/upload.php', fd, Utils.paramsPost);
	}

	this.inserir = function(params){
		return $http.post(Utils.baseUrlService + 'noticias/inseri.php', params);
	}

	this.visualizar = function(params){
		return $http.post(Utils.baseUrlService + 'noticias/visualiza.php', params);
	}

	this.editar = function(params){
		return $http.post(Utils.baseUrlService + 'noticias/edita.php', params);
	}

	this.deletar = function(params){
		return $http.post(Utils.baseUrlService + 'noticias/deleta.php', params);
	}

	return this;

})


.factory('eventoService', function($http, Utils, $state){

	this.upload = function(fd){
		return $http.post(Utils.baseUrlService + 'eventos/upload.php', fd, Utils.paramsPost);
	}

	this.inserir = function(params){
		return $http.post(Utils.baseUrlService + 'eventos/inseri.php', params);
	}

	this.visualizar = function(params){
		return $http.post(Utils.baseUrlService + 'eventos/visualiza.php', params);
	}

	this.editar = function(params){
		return $http.post(Utils.baseUrlService + 'eventos/edita.php', params);
	}

	this.deletar = function(params){
		return $http.post(Utils.baseUrlService + 'eventos/deleta.php', params);
	}

	return this;
})

.factory('arquivoService', function($http, Utils, $state){

	this.upload = function(fd){
		return $http.post(Utils.baseUrlService + 'arquivos/upload.php', fd, Utils.paramsPost);
	}

	this.inserir = function(params){
		return $http.post(Utils.baseUrlService + 'arquivos/inseri.php', params);
	}

	this.visualizar = function(params){
		return $http.post(Utils.baseUrlService + 'arquivos/visualiza.php', params);
	}

	this.editar = function(params){
		return $http.post(Utils.baseUrlService + 'arquivos/edita.php', params);
	}

	this.deletar = function(params){
		return $http.post(Utils.baseUrlService + 'arquivos/deleta.php', params);
	}

	return this;
})

.factory('contatoService', function($http, Utils, $state){

	this.inserir = function(params){
		return $http.post(Utils.baseUrlService + 'contatos/inseri.php', params);
	}

	this.visualizar = function(params){
		return $http.post(Utils.baseUrlService + 'contatos/visualiza.php', params);
	}

	this.editar = function(params){
		return $http.post(Utils.baseUrlService + 'contatos/edita.php', params);
	}

	this.deletar = function(params){
		return $http.post(Utils.baseUrlService + 'contatos/deleta.php', params);
	}

	return this;
})