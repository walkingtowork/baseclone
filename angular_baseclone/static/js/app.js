var baseclone = angular.module('baseclone',['ngRoute', 'ngResource']);

baseclone.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: HomeController}).
        otherwise({redirectTo: '/'});
}]);
