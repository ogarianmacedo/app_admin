// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ui.utils.masks'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('app.noticias',{
    url: '/noticias',
    views:{
      'menuContent':{
        templateUrl: 'templates/noticias.html',
        controller: 'noticiaCtrl'
      }
    }
  })

  .state('app.eventos',{
    url: '/eventos',
    views:{
      'menuContent':{
        templateUrl: 'templates/eventos.html',
        controller: 'eventosCtrl'
      }
    }
  })

  .state('app.arquivos',{
    url: '/arquivos',
    views:{
      'menuContent':{
        templateUrl: 'templates/arquivos.html',
        controller: 'arquivosCtrl'
      }
    }
  })

  .state('app.contatos',{
    url: '/contatos',
    views:{
      'menuContent': {
        templateUrl: 'templates/contatos.html',
        controller: 'contatosCtrl'
      }
    }
  })

  .state('app.usuarios',{
    url: '/usuarios',
    views: {
      'menuContent':{
        templateUrl: 'templates/usuarios.html',
        controller: 'usuariosCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('login');
  // $urlRouterProvider.otherwise('app/browse');
  
});
